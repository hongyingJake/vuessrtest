const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  devtool: isProd
    ? false
    : '#cheap-module-source-map',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    alias: {
      'public': path.resolve(__dirname, '../public')
    }
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
       {
            test: /\.css$/,
            use: ['vue-style-loader','css-loader']
           //ExtractTextPlugin 采用插件合并css样式在一个文件失败，有时间查看问题
            // use: ExtractTextPlugin.extract({
            //     fallback: 'vue-style-loader',
            //     use: 'css-loader'
            // })
        },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      }
      // {
      //   test: /\.styl(us)?$/,
      //   use: isProd
      //     ? ExtractTextPlugin.extract({
      //         use: [
      //           {
      //             loader: 'css-loader',
      //             options: { minimize: true }
      //           },
      //           'stylus-loader'
      //         ],
      //         fallback: 'vue-style-loader'
      //       })
      //     : ['vue-style-loader', 'css-loader', 'stylus-loader']
      // }
    ]
  },
  performance: {
    hints: false
  },
  plugins: isProd
    ? [
        new VueLoaderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
          compress: { warnings: false }
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new ExtractTextPlugin({
          filename: 'common.[chunkhash].css',
        })
      ]
    : [
        new VueLoaderPlugin(),
        new FriendlyErrorsPlugin()
      ]
}
