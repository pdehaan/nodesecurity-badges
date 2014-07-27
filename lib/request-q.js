'use strict';

var request = require('request');
var Q       = require('q');


module.exports = function requestQ(options) {
    var deferred = Q.defer();

    request(options, function(err, res, body) {
        if (err) { return deferred.reject(err); }
        deferred.resolve({
            statusCode : res.statusCode,
            body       : body
        });
    });

    return deferred.promise;
};
