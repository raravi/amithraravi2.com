const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    main:       './js/_main.js',
    //post:       './js/_post.js',
    //about:      './js/_about.js',
    //articles:   './js/_articles.js',
    //portfolio:  './js/_portfolio.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        }
      }
    ]
  },
  plugins: [
        new CleanWebpackPlugin(),
  ],
  optimization: {
	   concatenateModules: true,
	   minimize: true,
     splitChunks: {
       chunks: 'all'
     },
  },
};
