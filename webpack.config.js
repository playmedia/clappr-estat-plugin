const path = require('path')
const webpack = require('webpack')
const NotifierPlugin = require('webpack-notifier')

var outputFile, plugins = []

if (process.env.npm_lifecycle_event === 'dist') {
  outputFile = 'clappr-estat-plugin.min.js'
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    output: {
      comments: false,
    },
  }))
} else {
  outputFile = 'clappr-estat-plugin.js'
}

plugins.push(new NotifierPlugin({
  title: outputFile,
  alwaysNotify: true,
  // contentImage: path.resolve(__dirname, 'path/to/image.png')
}))

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: outputFile,
    library: 'ClapprEstatPlugin',
    libraryTarget: 'umd',
  },
  externals: {
   clappr: {
    amd: 'clappr',
    commonjs: 'clappr',
    commonjs2: 'clappr',
    root: 'Clappr',
   },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          path.resolve(__dirname, 'src')
        ],
        options: {
          presets: ['es2015'],
          plugins: ['add-module-exports'],
        },
      },
    ],
  },
  plugins: plugins,
  devServer: {
    contentBase: [
      path.resolve(__dirname, "public"),
      path.resolve(__dirname, "node_modules/clappr/dist"),
    ],
    // publicPath: '/js/',
    disableHostCheck: true, // https://github.com/webpack/webpack-dev-server/issues/882
    compress: true,
    host: "0.0.0.0",
    port: 8080
  }
}
