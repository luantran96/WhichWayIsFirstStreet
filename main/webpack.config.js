var path = require('path');
var DASHBOARD_SRC_DIR = path.join(__dirname, '/react-client/src/dashboard/components');
var LOGIN_SRC_DIR = path.join(__dirname, '/react-client/src/login/components');

var DIST_DIR = path.join(__dirname, '/react-client/dist');

module.exports = {
  entry: {
    dashboard: `${DASHBOARD_SRC_DIR}/Index.jsx`,
    login: `${LOGIN_SRC_DIR}/Index.jsx`,
  },
  output: {
    filename: '[name].js',
    path: DIST_DIR
  },
  module : {
    rules : [
      {
        test : /\.jsx?/,
        include : [DASHBOARD_SRC_DIR, LOGIN_SRC_DIR],
        exclude: /node_modules/,
        loader : 'babel-loader',      
        options: {
          presets: ['@babel/preset-react', '@babel/preset-env']
       }
      },
    ]
  }
}

