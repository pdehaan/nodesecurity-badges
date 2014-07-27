'use strict';

var config = require('config');
var Hapi   = require('hapi');
var server = new Hapi.Server(config.hapi.host, config.hapi.port, config.hapi.options);


server.on('request', function(request, event, tags) {
    var date = new Date(event.timestamp);
    date = (date) ?
        date.toISOString() :
        '[Invalid timestamp] ' + event.timestamp;

    if (tags.error) {
        return console.error(date, '<error>', event.data && event.data.message);
    }
    if (!tags.hapi) {
        console.log(date, '<' + event.tags.join(',') + '>', event.data);
    }
});

server.pack.events.on('log', function(event) {
    console.log((new Date(event.timestamp)).toISOString(), '<hapi>', event.data);
});

server.pack.register({ plugin: require('./index.js') }, function() {
    server.start(function() {
        console.log((new Date()).toISOString(), '<hapi>', 'server started:', server.info.uri);
    });
});
