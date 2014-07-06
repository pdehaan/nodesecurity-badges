var Joi  = require("joi");


exports.register = function (plugin, options, next) {
    plugin.log(['info', 'nodesecurity-badges'], 'nodesecurity-badges plugin registered');

    plugin.route({
        method: 'GET',
        path: '/badge/npm/{npmModule}.svg',
        handler: require('./lib/badge-handler.js'),
        config: {
            validate: {
                params: { npmModule : Joi.string().alphanum().min(1).max(39).required() }
            }
        }
    });

    next();
};


exports.register.attributes = {
    pkg: require('./package.json')
};
