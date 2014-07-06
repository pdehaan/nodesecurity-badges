module.exports = {
  "hapi": {
    "hostname" : "127.0.0.1",
    "port"     : 8000,
    "options"  : {
    }
  },
  "badges": {
    "ok"         : "./public/badges/module-dependencies-ok.svg",
    "vulnerable" : "./public/badges/module-dependencies-vulnerable.svg",
    "notFound"   : "./public/badges/module-not-found.svg",
    // Cache bagde response for 5 minutes
    "expiresIn"  : 5 * 60 * 1000
  }
};
