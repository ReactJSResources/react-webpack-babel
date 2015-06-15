var webpack = require('webpack');

module.exports = {
  entry: {
    app: './index.jsx'
  },
  devtool: process.env.WEBPACK_DEVTOOL || 'source-map',
  output: {
    path: __dirname + '/public',
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['jsx-loader', 'babel?optional[]=runtime&stage=0'],
      }
    ]
  },
  devServer: {
      contentBase: "./public",
      noInfo: true, //  --no-info option
      hot: true,
      inline: true
  }
};
