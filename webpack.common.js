const path = require('path');

module.exports = {
    entry: ['babel-polyfill', './src/index.js', './src/styles/main.scss'],
    output: {
        filename: 'js/main.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            exclude: [/node_modules/],
            query: {
                presets: ['es2015', 'react', 'stage-0']
            }
        }]
    },
}
