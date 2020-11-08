const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',

  devtool: 'eval-source-map',

  plugins: [
    new HtmlWebPackPlugin({
      template: './public/index.html',
      templateParameters: {
        title: 'Web App'
      }
    })
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            babelrc: false,
            presets: [
              [
                '@babel/preset-env',
                { targets: { browsers: '> 5%, not IE <= 11' } }
              ]
            ],
            plugins: ['@babel/proposal-class-properties', '@babel/plugin-proposal-export-default-from', '@babel/plugin-transform-runtime']
          }
        }
      }
    ]
  }
};
