const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const HTMLPlugin = require('html-webpack-plugin') // 能够生成一个html页面，并且把所有entery的js都注入到html中，路径就是output配置的
const baseConfig = require('./webpack.base')

const isDev = process.env.NODE_ENV = 'development'

const config = webpackMerge(baseConfig, {
  entry: {
    app: path.join(__dirname, '../client/app.js')
  },
  output: {
    filename: '[name].[hash].js'
  },
  plugins: [
    new HTMLPlugin({
      template: path.join(__dirname, '../client/tpl.html')
    })
  ]
})

if (isDev) {
  app: [
    path.join(__dirname, '../client/app.js')
  ]

  config.devServer = {
    host: '0.0.0.0',
    port: '8888',
    contentBase: path.join(__dirname, '../dist'),
    overlay: {
      errors: true
    },
    hot: true,
    publicPath:'/public/',
    historyApiFallback: {
      index: '/public/index.html'
    }
  }
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = config
