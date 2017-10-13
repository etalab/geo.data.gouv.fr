const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

const logger = require('../build/lib/logger')
const project = require('../project.config')

const inProject = path.resolve.bind(path, project.basePath)
const inProjectSrc = (file) => inProject(project.srcDir, file)
const res = p => path.resolve(__dirname, p)

const nodeModules = res('../node_modules')
const entry = res('../server/render.js')
const output = res('../buildServer')

const __DEV__ = project.env === 'development'
const __TEST__ = project.env === 'test'
const __PROD__ = project.env === 'production'

// if you're specifying externals to leave unbundled, you need to tell Webpack
// to still bundle `react-universal-component`, `webpack-flush-chunks` and
// `require-universal-module` so that they know they are running
// within Webpack and can properly make connections to client modules:
const externals = fs
  .readdirSync(nodeModules)
  .filter(x => !/\.bin|react-universal-component|webpack-flush-chunks/.test(x))
  .reduce((externals, mod) => {
    externals[mod] = `commonjs ${mod}`
    return externals
  }, {})

externals['react-dom/server'] = 'commonjs react-dom/server'

const config = {
  name: 'server',
  target: 'node',
  // devtool: 'source-map',
  devtool: 'eval',
  entry: [entry],
  externals,
  output: {
    path: output,
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: []
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.json'
    ],
    alias: {
      'common': inProject(project.srcDir),

      // We’re aliasing lodash to lodash-es here. We need to make sure
      // that all the versions of lodash used here are compatible.
      // Run `npm ls lodash` and `npm ls lodash-es` to make sure.
      'lodash': 'lodash-es'
    }
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),

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
  ]
}

// preact & preact-compat
// ------------------------------------
if (project.usePreact) {
  logger.info('Compiling with preact')

  config.resolve.alias = {
    ...config.resolve.alias,

    'react': 'preact-compat',
    'react-dom': 'preact-compat'
  }
} else {
  logger.info('Compiling with react')
}

// JavaScript
// ------------------------------------
config.module.rules.push({
  test: /\.(js|jsx)$/,
  include: [
    inProject(project.srcDir),
    inProject('./server')
  ],
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true
    }
  }
})

// Styles
// ------------------------------------

// Global styles
config.module.rules.push({
  test: /\.(sass|scss)$/,
  include: [
    inProjectSrc('styles')
  ],
  use: 'ignore-loader'
})

// Local Styles
config.module.rules.push({
  test: /\.(sass|scss)$/,
  exclude: [
    inProject('node_module'),
    inProjectSrc('styles')
  ],
  use: [
    {
      loader: 'css-loader/locals',
      options: {
        modules: true,
        localIdentName: '[name]-[hash:base64:8]',
        camelCase: 'only',
      }
    },
    {
      loader: 'sass-loader',
      options: {
        includePaths: [
          res('../src/styles')
        ]
      }
    }
  ]
})

// Vendor Styles
config.module.rules.push({
  test: /\.css$/,
  include: [
    inProject('node_modules')
  ],
  use: 'ignore-loader'
})

// Images
// ------------------------------------
config.module.rules.push({
  test: /\.(png|jpg|gif|svg)$/,
  use: 'ignore-loader'
})

module.exports = config
