'use strict';

var config           = require('config');
var resolveNpmModule = require('./resolve-npm-module.js');
var nodesecurityApi  = require('./nodesecurity-api-client.js');


module.exports = function(request, reply) {
    var badge = config.badges.ok;

    resolveNpmModule(request.params.npmModule)
        .then(function(packageInfo) {
            return nodesecurityApi.shrinkwrap(packageInfo);
        })
        .then(function(res) {
            // We found something!
            if (res.body && res.body.length > 0) {
                badge = config.badges.vulnerable;
            }
        })
        .fail(function(err) {
            request.log(['error'], err);

            var errorMessage = err.message.match(/^(\d{3})\b(.*)/);
            if (!errorMessage || !errorMessage[1]) {
                badge = config.badges.error;
                return;
            }

            badge = errorMessage[1] === '404' ?
                config.badges.moduleNotFound :
                config.badges.error;
        })
        .done(function() {
            reply.file(badge);
        });
};
