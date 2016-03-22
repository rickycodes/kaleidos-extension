const webpack = require('webpack')

module.exports = {
  entry: {
    content: './content.js',
  },
  output: {
    path: '.',
    filename: '[name].min.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({minimize: true})
  ]
}
