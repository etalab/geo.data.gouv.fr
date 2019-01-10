const {join} = require('path')
const nextRuntimeDotenv = require('next-runtime-dotenv')

// The following modules will be pushed to the commons.js bundle
const commonModules = [
  '/node_modules/fbjs/',
  '/node_modules/lodash-es/',
  '/node_modules/marked/',
  '/node_modules/next/',
  '/node_modules/scheduler/',
  '/node_modules/webpack/',

  '/components/hoc/',

  '/lib/session.js',

  '/pages/_error.js'
]

const withConfig = nextRuntimeDotenv({
  public: [
    'PUBLIC_URL',
    'DATAGOUV_API_URL',
    'DATAGOUV_API_KEY',
    'PUBLICATION_BASE_URL',
    'GEODATA_API_URL',
    'PIWIK_URL',
    'PIWIK_SITE_ID'
  ]
})

module.exports = withConfig({
  webpack(config, {dev, isServer}) {
    const {ContextReplacementPlugin} = require('webpack')

    config.plugins.push(
      new ContextReplacementPlugin(/moment[/\\]locale$/, /fr/)
    )

    if (!dev && !isServer) {
      const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')

      config.optimization.splitChunks.cacheGroups.shared = {
        name: 'commons',
        test: m => m.resource && commonModules.some(c =>
          m.resource.startsWith(join(__dirname, c))
        )
      }

      config.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
        reportFilename: join(__dirname, 'reports/bundles.html'),
        defaultSizes: 'gzip'
      }))

      config.resolve.alias = {
        // Replace lodash with lodash-es on client side.
        // This reduces the bundles sizes greatly and allows for webpack
        // scope hoisting in other dependencies.
        // Both lodash and lodash-es should be installed, as lodash-es
        // will not work server-side.
        lodash: 'lodash-es'
      }
    }

    return config
  }
})
