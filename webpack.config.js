var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');


function entryFactory(entry){
    return [
        'webpack-dev-server/client?http://0.0.0.0:9090', // WebpackDevServer host and port
        'webpack/hot/dev-server', // "only" prevents reload on syntax errors
    ].concat(entry);

}
module.exports = {
    entry: {
        table:entryFactory('./src/table.js'),
        todo:entryFactory('./src/todo.js'),
        index:entryFactory('./src/index.js')
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
        new webpack.HotModuleReplacementPlugin(),
        //new webpack.optimize.UglifyJsPlugin({
        //    compress: {
        //        warnings: false
        //    }
        //})
    ]
};