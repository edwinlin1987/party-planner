const express = require('express');
const debug = require('debug')('app:server');
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config');

const app = express();

// Rewrites all route requests to root /index.html
// as long as they fit certain criteria. Useful in
// single page apps for issues like page refreshing
app.use(require('connect-history-api-fallback')());

/**
 * TODO: separate logic for dev vs prod
 */
// if dev
const compiler = webpack(webpackConfig);

debug('enable webpack dev and HMR middleware');
// TODO: add webpack dev middleware and hot-middleware for hot loading
app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: '/',
  contentBase: path.resolve(__dirname, '/src'),
  hot: true,
  quiet: false,
  noInfo: false,
  lazy: false,
  stats: {
    chunks : false,
    chunkModules : false,
    colors : true
  }
}));

app.use(require('webpack-hot-middleware')(compiler));

module.exports = app;
