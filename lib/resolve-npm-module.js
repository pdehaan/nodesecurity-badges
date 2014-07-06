var npmdConfig   = require('npmd-config');
var npmdResolver = require('npmd-resolve');
var resolve      = npmdResolver(null, require('npmd-cache')({}, npmdConfig), npmdConfig);
var Q            = require('q');


module.exports = function(npmModule) {
  var deferred = Q.defer();

  resolve(npmModule, { greedy: true, online: true }, function (err, tree) {
    if (err) { return deferred.reject(err); }
    deferred.resolve(tree);
  });

  return deferred.promise;
};
