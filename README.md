# A Basic Web App Template

Uses [wsrun](https://github.com/hfour/wsrun), [yarn](https://yarnpkg.com/), [babel](https://babeljs.io/), [webpack](https://webpack.js.org/), [ES9](https://ecma-international.org/ecma-262/9.0/).

## Create the project skeleton

1. Create a new directory for the project:
```
$ mkdir basic-web-app
$ cd basic-web-app
```
1. Create a package.json file with content like this:
```
{
    "name": "@dboreham/basic-web-app",
    "version": "1.0.0",
    "description": "Dboreham Tutorials",
    "private": true,
    "author": "d.boreh.am",
    "license": "GPL-3.0",
    "workspaces": ["web-app"],
    "scripts": {
      "build": "wsrun -t build",
      "clean": "wsrun clean",
      "lint": "wsrun lint",
      "test": "wsrun -s test"
    },
    "dependencies": {
    },
    "devDependencies": {
      "wsrun": "^5.2.4"
    }
  }
```
See the [yarn workspaces documentation](https://classic.yarnpkg.com/en/docs/workspaces/) for more background.
1. Create a workspace subdirectory:
```
$ mkdir web-app
$ cd web-app
```
1. Create a package.json file with content like this:
```
{
    "name": "@dboreham/tutorial-web-app",
    "version": "1.0.0",
    "private": false,
    "author": "d.boreh.am",
    "license": "GPL-3.0",
    "scripts": {
      "build": "webpack -p",
      "start": "webpack-dev-server"
    },
    "dependencies": {
    },
    "devDependencies": {
    }
  }
```
1. Install webpack:
```
$ yarn add --dev webpack webpack-cli webpack-dev-server html-webpack-plugin
```
1. Install babel:
```
yarn add --dev babel-loader @babel/core @babel/preset-env
```
1. Install secret sauce to make babel and webpack work:
```
$ yarn add --dev @babel/plugin-transform-runtime @babel/plugin-proposal-export-default-from @babel/plugin-proposal-class-properties
```
[babel-plugin-transform-runtime](https://babeljs.io/docs/en/babel-plugin-transform-runtime#why)
1. Create a `webpack.config.js` file with content like this:
```
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
          }
        }
      }
    ]
  }
};
```
1. Create a file `public/index.html` with content like this:
```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title><%= title %></title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```
1. Create one or more source files, e.g. `src/index.js` with some content, e.g.:
```
alert('Yo!');
```
### Notes
Used a specific version of `html-webpack-plugin` due to [this bug](https://github.com/jantimon/html-webpack-plugin/issues/1523).


