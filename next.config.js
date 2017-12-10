const webpack = require('webpack')
const { join } = require('path')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = {
  clientBootstrap: [
    require.resolve('./util/font-loader.js')
  ],
  webpack: function (config, { dev }) {
    config.plugins.push(
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /fr/)
    )

    if (!dev) {
      config.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
        reportFilename: join(__dirname, 'reports/bundles.html'),
        defaultSizes: 'gzip'
      }))
    }

    config.resolve.alias = {
      // Replace lodash with lodash-es on client side.
      // This reduces the bundles sizes greatly and allows for webpack
      // scope hoisting in other dependencies.
      // Both lodash and lodash-es should be installed, as lodash-es
      // will not work server-side.
      lodash: 'lodash-es'
    }

    return config
  }
}
