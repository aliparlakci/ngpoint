const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'app/src/app.js'),
    output: {
        path: path.resolve(__dirname, 'app/dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader',
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
            },
        ],
    },
    resolve: {
        extensions: ['.js'],
    },
};
