var path = require('path');

module.exports = {
    entry: "./src/app.jsx",
    output: {
        path: path.resolve(__dirname, './public'),
        publicPath: '/public/',
        filename: 'bundle.js'
    },
    devServer: {
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                options: {
                    presets: [ 'env', 'react' ]
                }
            }
        ]
    }
}
