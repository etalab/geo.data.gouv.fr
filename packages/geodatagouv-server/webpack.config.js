const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const { UnusedFilesWebpackPlugin } = require('unused-files-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')

// const logger = require('./lib/logger')
const project = require('./project.config')

const inProject = path.resolve.bind(path, project.basePath)
const inProjectSrc = (file) => inProject(project.srcDir, file)

const __DEV__ = project.env === 'development'
const __TEST__ = project.env === 'test'
const __PROD__ = project.env === 'production'

const config = {
  name: 'server',

  target: 'node',

  entry: {
    server: [
      inProjectSrc(project.main)
    ]
  },

  devtool: project.sourcemaps
    ? __PROD__ ? 'source-map' : 'cheap-module-eval-source-map'
    : false,

  output: {
    path: inProject(project.outDir),
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },

  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.json'
    ],
    alias: {
      'common': 'geodatagouv-client/src',
      'is-webpack-bundle': inProjectSrc('tools/isWebpackBundle.js'),

      // We’re aliasing lodash to lodash-es here. We need to make sure
      // that all the versions of lodash used here are compatible.
      // Run `npm ls lodash` and `npm ls lodash-es` to make sure.
      'lodash': 'lodash-es'
    }
  },

  externals: project.externals,

  module: {
    rules: []
  },

  plugins: [
    new webpack.DefinePlugin(Object.assign({
      'process.env': Object.entries(project.environment).reduce((env, entry) => {
        const key = entry[0]
        const value = process.env[key] || entry[1] || ''
        env[key] = JSON.stringify(value)
        return env
      }, {
        NODE_ENV: JSON.stringify(project.env)
      }),

      __DEV__,
      __TEST__,
      __PROD__
    }, project.globals)),

    new UnusedFilesWebpackPlugin({
      pattern: `${project.srcDir}/**/*.*`,
      globOptions: {
        ignore: [
          '**/__test__/**',
          '**/__mocks__/**'
        ]
      }
    })
  ]
}

// preact & preact-compat
// ------------------------------------
if (project.usePreact) {
  // logger.info('Compiling with preact')

  config.resolve.alias = {
    ...config.resolve.alias,

    // 'react': 'preact-compat',
    // 'react-dom': 'preact-compat'
  }
} else {
  // logger.info('Compiling with react')
}

// JavaScript
// ------------------------------------
if (__DEV__) {
  config.module.rules.push({
    test: /\.(js|jsx)$/,
    include: inProject(project.srcDir),
    loader: 'eslint-loader',
    enforce: 'pre'
  })
}

config.module.rules.push({
  test: /\.(js|jsx)$/,
  include: [
    inProject('src'),
    /geodatagouv-client/
  ],
  use: [
    {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true
      }
    }
  ]
})

// Styles
// ------------------------------------
config.module.rules.push({
  test: /\.(sass|scss|css)$/,
  loader: 'ignore-loader'
})

// Images
// ------------------------------------
config.module.rules.push({
  test: /\.(png|jpg|gif|svg)$/,
  loader: 'ignore-loader'
})

// Fonts
// ------------------------------------
;[
  ['woff', 'application/font-woff'],
  ['woff2', 'application/font-woff2'],
  ['otf', 'font/opentype'],
  ['ttf', 'application/octet-stream'],
  ['eot', 'application/vnd.ms-fontobject']
].forEach(([ extension, mimetype ]) => {
  config.module.rules.push({
    test: new RegExp(`\\.${extension}$`),
    loader: 'url-loader',
    options: {
      name: __DEV__ ? 'fonts/[name].[ext]' : 'fonts/[name].[hash].[ext]',
      limit: 8192,
      mimetype
    }
  })
})

// Development Tools
// ------------------------------------
// if (__DEV__) {
//   config.plugins.push(
//     new webpack.HotModuleReplacementPlugin(),
//     new webpack.NamedModulesPlugin(),
//     new StyleLintPlugin()
//   )
// }

// // Production Optimizations
// // ------------------------------------
// if (__PROD__) {
//   config.plugins.push(
//     new webpack.optimize.ModuleConcatenationPlugin(),

//     new webpack.LoaderOptionsPlugin({
//       minimize: true,
//       debug: false
//     }),

//     new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /fr/),

//     new webpack.optimize.UglifyJsPlugin({
//       sourceMap: !!config.devtool,
//       comments: false,
//       compress: {
//         warnings: false,
//         screw_ie8: true,
//         conditionals: true,
//         unused: true,
//         comparisons: true,
//         sequences: true,
//         dead_code: true,
//         evaluate: true,
//         if_return: true,
//         join_vars: true
//       },
//       mangle: {
//         screw_ie8: true
//       },
//       output: {
//         comments: false,
//         screw_ie8: true
//       }
//     }),

//     new BundleAnalyzerPlugin({
//       analyzerMode: 'static',
//       openAnalyzer: false,
//       reportFilename: path.join('..', project.reportDir, 'bundles.html'),
//       defaultSizes: 'gzip'
//     })
//   )
// }

module.exports = config
