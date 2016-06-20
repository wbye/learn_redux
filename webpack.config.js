var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
    entry: {
        table:[
            'webpack-dev-server/client?http://0.0.0.0:9090', // WebpackDevServer host and port
            'webpack/hot/dev-server', // "only" prevents reload on syntax errors
            './src/table.js' // Your appʼs entry point
        ],
        todo:[
            'webpack-dev-server/client?http://0.0.0.0:9090', // WebpackDevServer host and port
            'webpack/hot/dev-server', // "only" prevents reload on syntax errors
            './src/todo.js' // Your appʼs entry point
        ]
    },
    output: {
        path: __dirname+"/public",
        filename: '[name].min.js',
        publicPath:"/public"
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [{
            test: /(\.js|\.jsx)$/,
            exclude: /node_modules/,
            loaders: ['react-hot','babel?presets[]=react,presets[]=es2015,presets[]=es2016']
        },{
            test:/\.css/,
            loader:"style!css"
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};