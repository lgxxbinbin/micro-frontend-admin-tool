// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ModuleFederationPlugin =
  require('webpack').container.ModuleFederationPlugin

const isProduction = process.env.NODE_ENV == 'production'

const stylesHandler = isProduction
  ? MiniCssExtractPlugin.loader
  : 'style-loader'

const deps = require('./package.json').dependencies
const devDeps = require('./package.json').devDependencies

const config = {
  entry: './src/index.js',
  output: {
    // publicPath: 'auto',
    // chunkFilename: '[id].[contenthash].js',
    filename: 'auth/[id].[contenthash].js',
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'auth'),
    },
    port: 6300,
    historyApiFallback: true,
    hot: 'only',
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'auth',
      filename: 'auth/remoteEntry.js',
      remotes: {
        '@shell': 'shell@http://localhost:3000/shell/remoteEntry.js',
      },
      exposes: {
        './Auth': './src/components/Auth',
        './Login': './src/components/Login',
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: deps['react-dom'],
        },
        '@material-ui/core': {
          singleton: true,
          requiredVersion: deps['@material-ui/core'],
        },
        'styled-components': {
          singleton: true,
          requiredVersion: devDeps['@material-ui/core'],
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      publicPath: '/',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        type: 'javascript/auto',
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(js|jsx)$/i,
        loader: 'babel-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },
    ],
  },
}

module.exports = () => {
  if (isProduction) {
    config.mode = 'production'

    config.plugins.push(new MiniCssExtractPlugin())
  } else {
    config.mode = 'development'
  }
  return config
}
