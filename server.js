var config = require('config');
var Hapi   = require('hapi');
var server = new Hapi.Server(config.hapi.host, config.hapi.port, config.hapi.options);


server.on('request', function (request, event, tags) {
    if (tags.error) { console.error(event); }
});

server.pack.events.on('log', function(event, tags) {
    console.log('[Hapi]', (new Date(event.timestamp)).toISOString(), event.data);
});

server.pack.register({ plugin: require('./index.js') }, function() {
    server.start(function() {
        console.log('[Hapi]', (new Date()).toISOString(), 'server started:', server.info.uri);
    });
});
