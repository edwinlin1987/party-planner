const { resolve } = require('path');

module.exports = env => {
  return {
    entry: './src/app.js',
    output: {
      path: resolve(__dirname,'dist'),
      filename: 'bundle.js',
      pathinfo: !env.prod
    },
    module: {
      loaders: []
    }
  };
};