//jshint strict: false
module.exports = function (config) {
    config.set({
        basePath: './app/src',

        files: ['./app.tests.js'],

        preprocessors: {
            './app.tests.js': ['webpack'],
            '**/*.test.js': ['webpack'],
        },

        webpack: require('./webpack.config'),

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['Chrome'],

        plugins: ['karma-webpack', 'karma-chrome-launcher', 'karma-jasmine'],
    });
};
