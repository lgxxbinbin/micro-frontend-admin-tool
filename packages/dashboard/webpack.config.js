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

const config = {
  entry: './src/index.js',
  output: {
    // path: path.resolve(__dirname, 'dist'),
    // publicPath: 'auto',
    // chunkFilename: '[id].[contenthash].js',
    filename: 'dashboard/[id].[contenthash].js',
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dashboard'),
    },
    port: 6100,
    historyApiFallback: true,
    hot: 'only',
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'dashboard',
      filename: 'dashboard/remoteEntry.js',
      remotes: {
        '@order': `order@http://localhost:3000/order/remoteEntry.js`,

        '@store': 'store@http://localhost:3000/store/remoteEntry.js',

        '@shell': 'shell@http://localhost:3000/shell/remoteEntry.js',
      },
      exposes: {
        './DashboardService': './src/pages/DashboardPage',
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
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      publicPath: '/',
    }),

    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
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
