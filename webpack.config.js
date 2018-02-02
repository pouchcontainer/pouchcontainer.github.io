const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// const fs = require('fs');
// const entry = {};
// const pagePath = path.join(__dirname, 'src');
// const pages = fs.readdirSync(pagePath);
// pages.forEach((me) => {
//   const stat = fs.lstatSync(path.join(pagePath, me));
//   if (me != 'components' && stat.isDirectory()) {
//     entry[me] = path.join(pagePath, me, 'index.js');
//   }
// });

const entry = {
  app: './src/index.jsx'
};

module.exports = {
  cache: true,
  entry,
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: 'build/',
    filename: '[name].js',
    chunkFilename: '[chunkhash].js'
  },
  externals: {
     react: 'React',
     'react-dom': 'ReactDOM'
  },
  query: {
    cacheDirectory: true,
    plugins: ['transform-decorators-legacy'],
    presets: ['es2015', 'stage-0', 'stage-1', 'react']
  },
  module: {
    loaders: [
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader') },
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0', 'stage-1', 'react'],
          plugins: [
            'add-module-exports',
            'transform-object-assign',
          ],
        },
      },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  resolve: {
    alias: {}
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin('[name].css?[hash]-[chunkhash]-[contenthash]-[name]')
  ]
};
