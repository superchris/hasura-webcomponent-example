const path = require('path');

module.exports = {
  entry: './src/entry.js',
  mode: 'development',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'hasura-wc-example',
    libraryTarget: 'umd'
  }
};
