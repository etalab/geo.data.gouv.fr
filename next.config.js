const webpack = require('webpack')
const dotenv = require('dotenv')

module.exports = {
  webpack: (config, { dev }) => {
    config.module.rules.push(
      {
        test: /\.css/,
        loader: 'emit-file-loader',
        options: {
          name: 'dist/[path][name].[ext]'
        }
      },
      {
        test: /\.css/,
        loader: 'babel-loader!raw-loader'
      }
    )

    const { parsed } = dotenv.config()

    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env': JSON.stringify({
          ...parsed,
          NODE_ENV: process.env.NODE_ENV
        })
      })
    )

    return config
  }
}
