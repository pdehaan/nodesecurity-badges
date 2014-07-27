'use strict';

var config           = require('config');
var Q                = require('q');
var requestQ         = require('./request-q.js');
var resolveNpmModule = require('./resolve-npm-module.js');
var nodesecurityApi  = require('./nodesecurity-api-client.js');


function getPackageJsonUrl(host, user, repo, branch) {
  branch = branch || 'master';

  var packageJsonUrl = {
    'github'    : 'https://raw.githubusercontent.com/' + user + '/' + repo + '/' + branch + '/package.json',
    'bitbucket' : 'https://bitbucket.org/' + user + '/' + repo + '/raw/' + branch + '/package.json'
  };
  return packageJsonUrl[host];
}


module.exports = function(request, reply) {
  var badge = config.badges.ok;
  var packageJsonUrl = getPackageJsonUrl(request.params.host, request.params.user, request.params.repo);
  var packageJson    = {};

  request.log(['info', 'package'], 'Fetching package.json ' + packageJsonUrl);
  requestQ({
        url     : packageJsonUrl,
        method  : 'get',
        headers : { 'content-type': 'application/json' },
        json    : true
    })
    // Resolve dependencies for each depenendy in package.json
    .then(function(res) {
        var npmPromises      = [];

        packageJson = res.body;
        request.log(['info', 'package'], 'Resolved file ' + packageJson.name);

        for (var dependency in packageJson.dependencies) {
            var version = packageJson.dependencies[dependency];
            if (version.indexOf('/') !== -1) {
                request.log(['info', 'externalDependency'], 'Skipping external dependency ' + dependency + '@' + version);
                continue;
            }

            request.log(['info', 'npm'], 'Resolving dependency for ' + dependency + '@' + version);
            npmPromises.push( resolveNpmModule(dependency, version) );
        }

        return Q.allSettled(npmPromises);
    })
    // Replace dependency in package.json with resolved dependency tree
    .then(function(results) {
        results.forEach(function (result) {
            if (result.state === "fulfilled") {
                var pkg = result.value;
                packageJson.dependencies[pkg.name] = pkg;
            } else {
                request.log(['error', 'npm'], 'Could not resolve npm module: ' + result.reason);
            }
        });
        return nodesecurityApi.shrinkwrap(packageJson);
    })
    .then(function(res) {
        // We found something!
        if (res.body && res.body.length > 0) {
            badge = config.badges.vulnerable;
        }
    })
    .fail(function(err) {
        var parsedError = err.message.match(/^(\d{3})\b(.*)/);
        request.log(['error'], err);

        // Error message from npmd-resolve
        if (typeof err === 'string' && parsedError) {
            err = { status : parsedError[1] || '500' };
        }
        badge = err.status && err.status === 404 ?
            config.badges.packagejsonNotFound :
            config.badges.error;
    })
    .done(function() {
        reply.file(badge);
    });
};
