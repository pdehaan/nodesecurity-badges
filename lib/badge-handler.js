var config           = require('config');
var resolveNpmModule = require('./resolve-npm-module.js');
var nodesecurityApi  = require('./nodesecurity-api-client.js');


module.exports = function (request, reply) {
  var badge = config.badges.ok;

  resolveNpmModule(request.params.npmModule)
    .then(function (packageInfo) {
      return nodesecurityApi.shrinkwrap(packageInfo);
    })
    .fail(function (err) {
      request.log(['error'], err);

      // Manually parse error message from 'npmd-resolve'
      var errorMessage = err.message.match(/^(\d{3})\b(.*)/);
      if (errorMessage[1]) {
        badge = config.badges.notFound;
      }
    })
    .done(function (body) {
      // We found something!
      if (body && body.length > 0) {
        badge = config.badges.vulnerable;
      }

      reply.file(badge);
    });
};
