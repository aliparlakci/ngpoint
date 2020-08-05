//jshint strict: false
module.exports = function (config) {
    config.set({
        basePath: './app/src',

        files: [
            '../../node_modules/angular/angular.js',
            '../../node_modules/angular-mocks/angular-mocks.js',
            '**/*.spec.js',
        ],

        preprocessors: {
            '../../node_modules/angular/angular.js': ['webpack'],
            '../../node_modules/angular-mocks/angular-mocks.js': ['webpack'],
            '**/*.spec.js': ['webpack'],
        },

        webpack: require('./webpack.config'),

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['Chrome'],

        plugins: ['karma-webpack', 'karma-chrome-launcher', 'karma-jasmine'],
    });
};
