'use strict';

var Joi  = require("joi");


exports.register = function(plugin, options, next) {
    plugin.log(['info', 'nodesecurity-badges'], 'nodesecurity-badges plugin registered');

    plugin.route({
        method: 'GET',
        path: '/badge/{host}/{user}/{repo}.svg',
        handler: require('./lib/git-badge.js'),
        config: {
            validate: {
                params: {
                    host : Joi.string().valid(['github', 'bitbucket']).required(),
                    user : Joi.string().regex(/^[\w\d-]+$/).min(1).max(39).required(),
                    repo : Joi.string().regex(/^[\w\d-]+$/).min(1).max(39).required(),
                }
            }
        }
    });

    plugin.route({
        method: 'GET',
        path: '/badge/npm/{npmModule}.svg',
        handler: require('./lib/npm-badge.js'),
        config: {
            validate: {
                params: { npmModule : Joi.string().regex(/^[\w\d-]+$/).min(1).max(39).required() }
            }
        }
    });

    next();
};


exports.register.attributes = {
    pkg: require('./package.json')
};
