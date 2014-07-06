var request = require('request');
var Q       = require('q');


module.exports.shrinkwrap = function(body) {
    var deferred = Q.defer();

    request({
        url     : 'https://nodesecurity.io/validate/shrinkwrap',
        method  : 'post',
        headers : { 'content-type': 'application/json' },
        body    : body,
        json    : true
    }, function (err, response, body) {
        if (err) { return deferred.reject(err); }
        deferred.resolve( body );
    });

    return deferred.promise;
};


