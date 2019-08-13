const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  mode: 'production', // production or development
  entry: './src/index.js', // the entry point of the project
  output: {
    path: path.join(__dirname, 'dist'), // built file path
    filename: 'app.bundle.js' // built file name
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'], // type of js version to recognise
          plugins: [
            '@babel/plugin-proposal-class-properties',
            'react-hot-loader/babel',
            '@babel/plugin-syntax-dynamic-import'
          ]
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: /node-modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
}
