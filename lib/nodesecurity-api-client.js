'use strict';

var requestQ = require('./request-q.js');


module.exports.shrinkwrap = function(body) {
    return requestQ({
        url     : 'https://nodesecurity.io/validate/shrinkwrap',
        method  : 'post',
        headers : { 'content-type': 'application/json' },
        body    : body,
        json    : true
    });
};


