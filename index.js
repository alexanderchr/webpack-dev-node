#!/usr/bin/env node

var path = require('path');
var fork = require('child_process').fork;
var webpack = require('webpack');
var argv = require('yargs').argv;

var options = {
  config: argv.config || 'webpack.config',
  chunk: argv.chunk || 'main'
};

var webpackConfiguration = require(path.join(process.cwd(), options.config));
var compiler = webpack(webpackConfiguration);

var outputProcess;
compiler.plugin('done', function(stats) {
  if (stats.hasErrors()) {
    return;
  }

  if (!outputProcess) {
    var outputDirectory = stats.compilation.compiler.outputPath;
    var outputFile = stats.toJson().assetsByChunkName[options.chunk];

    if (!outputFile) {
      throw `Chunk '${options.chunk}' has no assets`;
    }

    var outputPath = path.join(outputDirectory, outputFile);
    outputProcess = fork(outputPath);
  } else {
    // TODO: Validate that webpack is in idle mode before sending signal
    // `hot/signal` listens to SIGUSR2 signals to know when to reload
    outputProcess.kill('SIGUSR2');
  }
});

compiler.watch(options.watchOptions, function(error, stats) {
  if (error) {
    throw error;
  }
});
