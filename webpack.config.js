const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: {
      keep: /\.git/,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'badstore',
      template: 'src/index.html',
    }),
    new ESLintPlugin({ extensions: 'ts' }),
    new CopyPlugin({
      patterns: [
        { from: './src/assets/data', to: 'data' }, 
        { from: './src/assets/icons', to: 'icons' }
      ]
    })
  ],
  optimization: {
    runtimeChunk: 'single',
  },
}
