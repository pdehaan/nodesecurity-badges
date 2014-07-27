# nodesecurity-badges

nodesecurity.io Github badges


### Usage

Add the following line to your GitHub repository's README file:

```
![nodesecurity.io vulnerability check](nodesecurity-badge)
```

If your repository is a registered npm module, use the following URL:

```
[nodesecurity-badge]: https://nodesecurity.io/badge/npm/{npm-module-name}.svg
```

Otherwise, if it's just a repository on GitHub or BitBucket, use one of those:

```
[nodesecurity-badge]: https://nodesecurity.io/badge/github/{user}/{repo}.svg
[nodesecurity-badge]: https://nodesecurity.io/badge/bitbucket/{user}/{repo}.svg
```


The API endpoints respond with one of the following states:

- The module's dependencies don't contain __known__ security issues
- One (or more) of the module's dependencies are vulnerable (check [nodesecurity.io](https://nodesecurity.io) for details)
- The module could not be found on the npm registry (npm modules only)
- The package.json could not be found in the repository (repositories only)
- An unknown error occured


### ToDos

- Optimize caching settings for the route (currently set to 5 minutes)
- Suppress npmd-resolve console output


### License

[MIT](LICENSE.txt)
