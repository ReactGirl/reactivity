const path = require('path')
const webpack = require('webpack')
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin')
const Dotenv = require('dotenv-webpack')

module.exports = {
  name: 'client',
  target: 'web',
  devtool: 'source-map',
  // devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false&quiet=false&noInfo=false',
    'react-hot-loader/patch',
    path.resolve(__dirname, '../src/client.js')
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../buildClient'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.scss?$/,
        use: ExtractCssChunks.extract({
          use: [{
            loader: 'style-loader'
          }, {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 2
            }
          }, {
            loader: 'sass-loader'
          }]
        })
      }, {
        test: /\.(jpg|png|gif|svg|ico)$/,
        use: [{
          loader: 'url-loader'
        }]
      }
      // {
      //   test: /\.css$/,
      //   use: ExtractCssChunks.extract({
      //     use: {
      //       loader: 'css-loader',
      //       options: {
      //         modules: true,
      //         localIdentName: '[name]__[local]--[hash:base64:5]'
      //       }
      //     }
      //   })
      // }
    ]
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx'],
    alias: {
      api: path.resolve(__dirname, 'src/api/'),
      components: path.resolve(__dirname, 'src/components/'),
      reducers: path.resolve(__dirname, 'src/redux/reducers/')
    }
  },
  plugins: [
    new ExtractCssChunks(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['bootstrap'], // needed to put webpack bootstrap code before chunks
      filename: '[name].js',
      minChunks: Infinity
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new webpack.ProvidePlugin({
      fetch: 'isomorphic-fetch'
    }),
    new Dotenv({
      path: path.resolve(__dirname, '../.env'),
      safe: false
    })
  ]
}
