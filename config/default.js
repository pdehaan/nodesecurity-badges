'use strict';

var path = require('path');

module.exports = {
    hapi: {
        hostname : '127.0.0.1',
        port     : 8000,
        options  : {
        }
    },
    badges: {
        ok                  : './public/badges/module-dependencies-ok.svg',
        error               : './public/badges/general-error.svg',
        vulnerable          : './public/badges/module-dependencies-vulnerable.svg',
        moduleNotFound      : './public/badges/module-not-found.svg',
        packagejsonNotFound : './public/badges/packagejson-not-found.svg',
        // Cache bagde response for 5 minutes
        expiresIn  : 5 * 60 * 1000
    },
    npm: {
        registry : 'https://skimdb.npmjs.com/registry/',
        cache    : path.join(process.cwd(), '.npmcache'),
        dbPath   : path.join(process.cwd(), '.npmd')
    }
};
