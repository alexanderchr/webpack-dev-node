const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  externals: [nodeExternals({ whitelist: 'webpack/hot/signal' })],
  node: {
    __dirname: '.',
    __filename: false,
  },
  entry: [
    'webpack/hot/signal',
    './src/server',
  ],
  output: {
    path: './build',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
};
