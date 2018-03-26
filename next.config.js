const {join} = require('path')
const webpack = require('webpack')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')

// The following dependencies will be pushed to the commons.js bundle
const commonDependencies = [
  '/lodash-es/',
  '/marked/',

  '/components/hoc/',

  '/pages/_error.js'
]

module.exports = {
  webpack(config, {dev, isServer}) {
    config.plugins.push(
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /fr/)
    )

    if (!dev && !isServer) {
      const commonPlugin = config.plugins.find(p =>
        p.constructor.name === 'CommonsChunkPlugin' && p.filenameTemplate === 'main.js'
      )

      if (commonPlugin) {
        const {minChunks} = commonPlugin

        commonPlugin.minChunks = (module, count) => {
          if (module.resource && commonDependencies.some(c => module.resource.includes(c))) {
            return true
          }

          return minChunks(module, count)
        }
      }

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
