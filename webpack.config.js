var path = require('path');
var SRC_DIR = path.join(__dirname, '/react-client/src/components');
var DIST_DIR = path.join(__dirname, '/react-client/dist');

module.exports = {
  entry: `${SRC_DIR}/Index.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  module : {
    rules : [
      {
        test : /\.jsx?/,
        include : SRC_DIR,
        exclude: /node_modules/,
        loader : 'babel-loader',      
        options: {
          presets: ['@babel/preset-react', '@babel/preset-env']
       }
      },
    ]
  }
}

