const express = require('express');
const debug = require('debug')('app:server');
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config');

const environment = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3000;

const app = express();

// Rewrites all route requests to root /index.html
// as long as they fit certain criteria. Useful in
// single page apps for issues like page refreshing
app.use(require('connect-history-api-fallback')());

if (environment === 'development') {
  const compiler = webpack(webpackConfig(environment));

  debug('enable webpack dev and HMR middleware');
  // dev middleware
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

  // hot reloading middleware
  app.use(require('webpack-hot-middleware')(compiler));

  // serving static files directly from static during development,
  // they should be copied to the dist folder in compilation
  app.use(express.static(path.resolve(__dirname, '/src/static')));
} else {
  debug('not in development mode - using application server to serve files');
  app.use(express.static(path.resolve(__dirname, '/dist')));
}

app.listen(port);
debug(`Server is now running at http://localhost:${port}.`);
