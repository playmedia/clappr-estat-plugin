const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const NotifierPlugin = require('webpack-build-notifier')
const version = require('./package.json').version

var name = 'clappr-estat-plugin'
var outputFile, plugins = [], optimization = {}

if (process.env.npm_lifecycle_event === 'build-min') {
  outputFile = name + '.min.js'
  optimization.minimizer = [
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
      uglifyOptions: {
        output: {
          comments: false,
        },
      }
    }),
  ]
} else {
  outputFile = name + '.js'
  optimization.minimize = false
}

plugins.push(new NotifierPlugin({
  title: optimization.minimizer ? 'minified ' + name : name,
}))

plugins.push(new webpack.DefinePlugin({
  PLUGIN_VERSION: JSON.stringify(version),
}))

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: outputFile,
    library: 'ClapprEstatPlugin',
    libraryTarget: 'umd',
  },
  optimization: optimization,
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        },
        include: [
          path.resolve(__dirname, 'src')
        ],
      },
    ],
  },
  plugins: plugins,
  externals: {
   clappr: {
    amd: 'clappr',
    commonjs: 'clappr',
    commonjs2: 'clappr',
    root: 'Clappr'
   }
  },
  devServer: {
    contentBase: [
      path.resolve(__dirname, "public"),
    ],
    // publicPath: '/js/',
    disableHostCheck: true, // https://github.com/webpack/webpack-dev-server/issues/882
    compress: true,
    host: "0.0.0.0",
    port: 8080
  }
}
