#!/usr/bin/env node

const path = require('path');
const fork = require('child_process').fork;
const webpack = require('webpack');
const argv = require('yargs').argv;

const options = {
  config: argv.config || 'webpack.config',
  chunk: argv.chunk || 'main'
};

const webpackConfiguration = require(path.join(process.cwd(), options.config));
const compiler = webpack(webpackConfiguration);

let outputProcess;
compiler.plugin('done', function(stats) {
  if (stats.hasErrors()) {
    return;
  }

  if (!outputProcess) {
    const outputDirectory = stats.compilation.compiler.outputPath;
    const outputFile = stats.toJson().assetsByChunkName[options.chunk];

    if (!outputFile) {
      throw `Chunk '${options.chunk}' has no assets`;
    }

    const outputPath = path.join(outputDirectory, outputFile);
    outputProcess = fork(outputPath);
  } else {
    // TODO: Validate that webpack is in idle mode before sending signal
    // does not actually kill the process - `hot/signal` reloads on receiving SIGUSR2 signals
    outputProcess.kill('SIGUSR2');
  }
});

compiler.watch(options.watchOptions, function(error, stats) {
  if (error) {
    throw error;
  }
});
