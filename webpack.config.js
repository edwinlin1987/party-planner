const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { resolve } = require('path');

module.exports = env => {
  const ifProd = value => env.prod ? value : undefined;
  // const ifNotProd = value => env.prod ? undefined : value
  // const ifTest = value => env.test ? value : undefined
  // const ifNotTest = value => env.test ? undefined : value
  const removeEmpty = array => array.filter(i => !!i);
  return {
    entry: {
      app: './app.js',
      vendor: ['lodash']
    },
    output: {
      path: resolve(__dirname, 'dist'),
      filename: 'bundle.[name].[chunkhash].js',
      pathinfo: !env.prod
    },
    context: resolve(__dirname, 'src'),
    plugins: removeEmpty([
      ifProd(new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
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
