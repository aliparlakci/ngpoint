//jshint strict: false
const webpackConfig = require('./webpack.config.js');
webpackConfig.mode = 'development';

module.exports = function (config) {
    config.set({
        basePath: './src',

        files: [
            '../node_modules/angular/angular.js',
            '../node_modules/angular-mocks/angular-mocks.js',
            '**/*.spec.js',
        ],

        preprocessors: {
            '**/*.spec.js': ['webpack'],
        },

        reporters: ['progress', 'coverage'],

        coverageReporter: {
            includeAllSources: true,
            dir: '../coverage/',
            reporters: ['html', { type: 'text-summary' }],
        },

        webpack: webpackConfig,

        logLevel: config.LOG_INFO,

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['Chrome', 'ChromeHeadless'],

        customLaunchers: {
            ChromeHeadless: {
                base: 'Chrome',
                flags: [
                    '--headless',
                    '--disable-gpu',
                    '--disable-translate',
                    '--disable-extensions',
                    '--remote-debugging-port=9223',
                    '--no-sandbox',
                    '--media-cache-size=1',
                    '--disk-cache-size=1',
                ],
            },
            ChromeDebugging: {
                base: 'Chrome',
                flags: [
                    '--disable-translate',
                    '--disable-extensions',
                    '--remote-debugging-port=9333',
                    '--media-cache-size=1',
                    '--disk-cache-size=1',
                ],
            },
        },

        port: 9976,

        webpackMiddleware: {
            stats: 'errors-only',
        },

        plugins: [
            'karma-webpack',
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-coverage',
        ],
    });
};
