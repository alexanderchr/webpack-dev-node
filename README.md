# webpack-dev-node

Node's response to `webpack-dev-middleware`. It starts a webpack watcher, runs the main entry, and sends signals for it to refresh whenever new code is generated.

## Usage

* `npm install --save-dev webpack-dev-node`

* Add `webpack/hot/signal` as an entry and  `HotModuleReplacementPlugin` as a plugin.

```
{
  entry: [
    'webpack/hot/signal'
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}
```

* Add `module.hot.accept` hooks as you see fit. Refer to [webpack HMR documentation](https://webpack.github.io/docs/hot-module-replacement.html) for instructions. Use `node-dynamic-middleware` to easily replace connect middleware.

* Finally, run

`webpack-dev-node --config webpack.config.js`

or simply

`webpack-dev-node`
