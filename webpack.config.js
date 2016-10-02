const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { resolve } = require('path');

module.exports = env => {
  const ifProd = value => env.prod ? value : undefined;
  // const ifNotProd = value => env.prod ? undefined : value;
  // const ifTest = value => env.test ? value : undefined;
  // const ifNotTest = value => env.test ? undefined : value;
  const ifDev = value => env.dev ? value : undefined;
  // const ifNotDev = value => env.dev ? undefined : value;
  const removeEmpty = array => array.filter(i => !!i);

  const appEntry = './js/app.js';

  return {
    entry: {
      app: env.dev ? appEntry.concat('webpack-hot-middleware/client?path=/__webpack_hmr') : appEntry,
      vendor: ['lodash']
    },
    output: {
      path: resolve(__dirname, 'dist'),
      filename: 'bundle.[name].[chunkhash].js',
      pathinfo: !env.prod
    },
    context: resolve(__dirname, 'src'),
    plugins: removeEmpty([
      new webpack.optimize.OccurrenceOrderPlugin(),
      ifDev(new webpack.HotModuleReplacementPlugin()),
      ifDev(new webpack.NoErrorsPlugin()),
      ifProd(new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
      })),
      ifProd(new webpack.optimize.DedupePlugin()),
      ifProd(new webpack.optimize.UglifyJsPlugin({
        compress : {
          unused    : true,
          dead_code : true,
          warnings  : false
        }
      })),
      // Uncomment this when there are multiple different apps
      // ifNotTest(new webpack.optimize.CommonsChunkPlugin({
      //   name: 'common',
      //   chunks: ['app']
      // })),
      ifProd(new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      })),
      new HtmlWebpackPlugin({
        template: './index.html'
      })
    ]),
    module: {
      loaders: [
        { test: /\.js$/, loader: 'babel!eslint', exclude: /node_modules/ }
      ]
    }
  };
};
