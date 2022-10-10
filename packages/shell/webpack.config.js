// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
const ModuleFederationPlugin =
  require('webpack').container.ModuleFederationPlugin

const isProduction = process.env.NODE_ENV == 'production'

const stylesHandler = isProduction
  ? MiniCssExtractPlugin.loader
  : 'style-loader'

const deps = require('./package.json').dependencies

const OUTPUT_DIR = path.resolve(__dirname, 'docs')

const config = {
  entry: './src/index.js',
  output: {
    // path: path.resolve(__dirname, 'dist'),
    // publicPath: 'auto',
    // chunkFilename: '[id].[contenthash].js',
    path: OUTPUT_DIR,
    filename: 'shell/[id].[contenthash].js',
  },
  resolve: {
    extensions: ['.js', '.mjs', '.jsx', '.css'],
    alias: {
      events: 'events',
    },
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'shell'),
    },
    hot: 'only',
    historyApiFallback: true,
    port: 6001,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers':
        'X-Requested-With, content-type, Authorization',
    },
  },
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

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'shell',
      filename: 'shell/remoteEntry.js',
      remotes: {
        '@auth': 'auth@http://localhost:3000/auth/remoteEntry.js',
        '@order': 'order@http://localhost:3000/order/remoteEntry.js',
        '@dashboard':
          'dashboard@http://localhost:3000/dashboard/remoteEntry.js',

        '@store': 'store@http://localhost:3000/store/remoteEntry.js',

        '@shell': 'shell@http://localhost:3000/shell/remoteEntry.js',
      },
      exposes: {
        './Shell': './src/components/Shell',
        './ServiceContext': './src/context/ServiceContext',
      },
      shared: [
        {
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
        },
        './src/context/ServiceContext',
      ],
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      publicPath: '/',
    }),

    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
}

module.exports = () => {
  if (isProduction) {
    config.mode = 'production'

    config.plugins.push(new MiniCssExtractPlugin())

    config.plugins.push(new WorkboxWebpackPlugin.GenerateSW())
  } else {
    config.mode = 'development'
  }
  return config
}
