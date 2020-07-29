const path = require('path');

module.exports = {
    entry: './app/src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, './app/dist'),
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader',
            },
        ],
    },
    resolve: {
        extensions: ['.js'],
    },
};
