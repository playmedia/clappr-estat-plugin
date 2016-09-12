var path = require('path');
var webpack = require('webpack');
var Clean = require('clean-webpack-plugin');

var plugins = [
  new Clean(['dist'])
];

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  plugins: plugins,
  externals: {
   clappr: {
    amd: 'clappr',
    commonjs: 'clappr',
    commonjs2: 'clappr',
    root: 'Clappr'
   }
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
            compact: true,
        }
      },
    ],
  },
  resolve: {
    extensions: ['', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'clappr-estat-plugin.js',
    library: 'ClapprEstatPlugin',
    libraryTarget: 'umd',
  },
};
