const config = require('./webpack.config.js');

config.mode = 'production';

config.optimization = {
  splitChunks: {
    chunks: 'all'
  }
};

module.exports = config;
