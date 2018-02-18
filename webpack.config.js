"use strict";
const webpack = require('webpack');
const path = require('path');
const loadersConf = require('./webpack.loaders');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || "8888";


module.exports = {
  entry: [
    // POLYFILL: Set up an ES6-ish environment
    // 'babel-polyfill', // Either the entire babel-polyfill
    // Or fine-tune es6 features needed (included into babel-polyfill)
    // Example:
    'core-js/fn/promise',
    'core-js/es6/object',
    'core-js/es6/array',

    'react-hot-loader/patch',
    './src/index.jsx', // your app's entry point
  ],
  devtool: process.env.WEBPACK_DEVTOOL || 'eval-source-map',
  output: {
    publicPath: '/',
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: loadersConf
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.join(__dirname, "src"),
      path.join(__dirname, "node_modules"), // the old 'fallback' option (needed for npm link-ed packages)
    ],
    alias: {
      "styles": path.resolve(__dirname, 'styles/'),
    }
  },
  devServer: {
    contentBase: "./public",
    // do not print bundle build stats
    noInfo: true,
    // enable HMR
    hot: true,
    // embed the webpack-dev-server runtime into the bundle
    inline: true,
    // serve index.html in place of 404 responses to allow HTML5 history
    historyApiFallback: true,
    port: PORT,
    host: HOST
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true
    }),
    new DashboardPlugin(),
    new HtmlWebpackPlugin({
      template: './src/template.html',
      files: {
        css: ['style.css'],
        js: [ "bundle.js"],
      }
    }),
  ]
};
