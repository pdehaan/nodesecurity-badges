# nodesecurity-badges

nodesecurity.io Github badges


### Usage

Add the following line to your GitHub repository's README file:

```
![nodesecurity.io vulnerability check](https://nodesecurity.io/badges/npm/{your-npm-module}.svg)
```

It responds with one of three different states:

- The module's dependencies don't contain __known__ security issues
- One (or more) of the module's dependencies are vulnerable (check [nodesecurity.io](https://nodesecurity.io) for details)
- The module could not be found on the npm registry


### ToDos

- Add proper caching of npm registry calls (see '[npmd-resolve](https://www.npmjs.org/package/npmd-resolve)' and '[npmd-cache](https://www.npmjs.org/package/npmd-cache)' modules)
- Optimize caching settings for the route (currently set to 5 minutes)
- Suppress npmd-resolve console output


### License

[MIT](LICENSE.txt)
