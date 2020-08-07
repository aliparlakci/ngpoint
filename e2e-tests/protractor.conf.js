const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../webpack.config');

let server;

exports.config = {
    allScriptsTimeout: 11000,

    specs: ['*.js'],

    capabilities: {
        browserName: 'chrome',

        chromeOptions: {
            args: [
                '--headless',
                '--no-sandbox',
                '--disable-gpu',
                '--window-size=800,600',
            ],
        },
    },

    baseUrl: 'http://localhost:3000/',

    framework: 'jasmine',

    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000,
    },

    beforeLaunch: () => {
        const compiler = webpack(webpackConfig);
        server = new WebpackDevServer(compiler, {
            publicPath: '',
            contentBase: path.resolve(__dirname, './'), // New
            compress: true,
            watchContentBase: true,
            watchOptions: {
                poll: true,
            },
        });
        server.listen(3000, () => {});
    },
    afterLaunch: () => server.close(),
};
