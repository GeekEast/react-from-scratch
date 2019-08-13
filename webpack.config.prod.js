const merge = require('webpack-merge')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const baseConfig = require('./webpack.config.base')

module.exports = merge(baseConfig, {
  mode: 'production',
  plugins: [
    new BundleAnalyzerPlugin({
      // analyzerMode: 'static', // optional: generate a report html rather than starting a server
      // openAnalyzer: false // optional: to generate report html wihtout opening it
      // reportFilename: 'bundle_size.html' //optiona: the report name
    })
  ],
  // external means exclude sth out of the bundle.sj
  // in the following case, the app is blank because we eject the react and react-dom
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  }
})
