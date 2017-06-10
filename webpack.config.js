var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        // noParse: /jquery|THREE/,
        rules: [{
                test: /\.css$/,
                // use: [ 'style-loader', 'css-loader' ]
                use: ExtractTextPlugin.extract({
                    use: 'css-loader'
                })
            },
            // {
            //     test: require.resolve('jquery'),
            //     use: 'imports-loader?this=>window'
            // }
        ]
    },
    plugins: [
        // 生成一个单独的css文件
        new ExtractTextPlugin('styles.css'),
        // 第三方全局插件、库
        new webpack.ProvidePlugin({
            $: 'jquery',
            jquery: 'jquery',
            // 'window.jQuery': 'jquery',
            d3: 'd3',
        }),
    ],
    resolve: {
        // 别名
        alias: {
            jquery: 'jquery/dist/jquery.min',
            d3: 'd3/build/d3',
        }
    },
    // 生成map文件
    devtool: 'inline-source-map',
    devServer: {
        // proxy URLs to backend development server
        // proxy: {
        //     '/api': 'http://localhost:3000'
        // },
        contentBase: path.join(__dirname, ''), // boolean | string | array, static file location
        publicPath: '/dist',
        compress: true, // enable gzip compression
        historyApiFallback: true, // true for index.html upon 404, object for multiple paths
        hot: false, // hot module replacement. Depends on HotModuleReplacementPlugin
        https: false, // true for self-signed, object for cert authority
        noInfo: true, // only errors & warns on hot reload
        // ...
    }
};
