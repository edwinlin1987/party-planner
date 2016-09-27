// Karma configuration
// Generated on Sun Sep 25 2016 23:48:42 GMT-0700 (PDT)

const webpackConfig = require('./webpack.config')({ test: true });
const testGlob = 'src/js/**/*.test.js';
const srcGlob = 'src/js/**/*!(test).js';

process.env.BABEL_ENV = 'test';

module.exports = function (config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',
    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai'],
    // list of files / patterns to load in the browser
    files: [testGlob, srcGlob],
    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      [testGlob] : ['webpack'],
      [srcGlob] : ['webpack']
    },
    // webpack config
    webpack : webpackConfig,
    // webpack middleware
    webpackMiddleware: { noInfo: true },
    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      reporters: [
        { type: 'lcov', dir: 'coverage/', subdir: '.' },
        { type: 'json', dir: 'coverage/', subdir: '.' },
        { type: 'text-summary' }
      ]
    },
    // web server port
    port: 9876,
    // enable / disable colors in the output (reporters and logs)
    colors: true,
    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,
    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome', 'Firefox', 'Safari'],
    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,
    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  });
};
