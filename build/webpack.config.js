const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const { UnusedFilesWebpackPlugin } = require('unused-files-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')

const logger = require('./lib/logger')
const project = require('../project.config')

const inProject = path.resolve.bind(path, project.basePath)
const inProjectSrc = (file) => inProject(project.srcDir, file)

const __DEV__ = project.env === 'development'
const __TEST__ = project.env === 'test'
const __PROD__ = project.env === 'production'

const config = {
  entry: {
    app: [
      inProjectSrc(project.main)
    ]
  },

  devtool: project.sourcemaps ? 'source-map' : false,

  output: {
    path: inProject(project.outDir),
    filename: __DEV__ ? 'scripts/[name].js' : 'scripts/[name].[chunkhash].js',
    chunkFilename: __DEV__ ? 'scripts/modules/[name].js' : 'scripts/modules/[name].[chunkhash].js',
    publicPath: project.publicPath
  },

  resolve: {
    modules: [
      inProject(project.srcDir),
      inProject('node_modules')
    ],
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

  externals: project.externals,

  module: {
    rules: [],
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
          '**/__mocks__/**',
        ]
      }
    })
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
  include: inProject(project.srcDir),
  use: [
    {
      loader: 'babel-loader',
      query: {
        cacheDirectory: true
      }
    }
  ]
})

// Local Styles
// ------------------------------------
const localStyles = new ExtractTextPlugin({
  filename: 'styles/[name].[contenthash].css',
  allChunks: true,
  disable: !__PROD__
})

config.module.rules.push({
  test: /\.(sass|scss)$/,
  exclude: [
    inProject('node_modules')
  ],
  loader: localStyles.extract({
    fallback: 'style-loader',
    use: [
      {
        loader: 'css-loader',
        options: {
          modules: true,
          localIdentName: '[name]-[hash:base64:8]',
          camelCase: 'only',
          sourceMap: project.sourcemaps,
          minimize: {
            autoprefixer: {
              add: true,
              remove: true,
              browsers: ['last 2 versions']
            },
            discardComments: {
              removeAll: true
            },
            discardUnused: false,
            mergeIdents: false,
            reduceIdents: false,
            safe: true,
            sourcemap: project.sourcemaps
          }
        }
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: project.sourcemaps,
          includePaths: [
            inProjectSrc('styles')
          ]
        }
      }
    ]
  })
})

config.plugins.push(localStyles)

// Vendor Styles
// ------------------------------------
config.module.rules.push({
  test: /\.css$/,
  include: [
    inProject('node_modules')
  ],
  use: [
    {
      loader: 'style-loader',
      options: {
        sourceMap: __DEV__
      }
    },
    {
      loader: 'css-loader',
      options: {
        sourceMap: __DEV__,
        minimize: {
          autoprefixer: {
            add: true,
            remove: true,
            browsers: ['last 2 versions']
          },
          discardComments: {
            removeAll: true
          },
          discardUnused: false,
          mergeIdents: false,
          reduceIdents: false,
          safe: true,
          sourcemap: __DEV__
        }
      }
    }
  ]
})

// Images
// ------------------------------------
config.module.rules.push({
  test: /\.(png|jpg|gif|svg)$/,
  use: [
    {
      loader: 'url-loader',
      options: {
        limit: 8192,
        name: __DEV__ ? 'images/[name].js' : 'images/[name].[chunkhash].js'
      }
    },
    {
      loader: 'imagemin-loader',
      options: {
        enabled: __PROD__,
        plugins: [
          {
            use: 'imagemin-pngquant'
          },
          {
            use: 'imagemin-svgo'
          }
        ]
      }
    }
  ]
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
      name: 'fonts/[name].[ext]',
      limit: 10000,
      mimetype
    }
  })
})

// HTML Template
// ------------------------------------
config.plugins.push(new HtmlWebpackPlugin({
  template: inProjectSrc('index.html'),
  inject: true,
  minify: {
    removeComments: true,
    collapseWhitespace: true,
    removeRedundantAttributes: true,
    useShortDoctype: true,
    removeEmptyAttributes: true,
    removeStyleLinkTypeAttributes: true,
    keepClosingSlash: true,
    minifyJS: true,
    minifyCSS: true,
    minifyURLs: true
  }
}))

// Development Tools
// ------------------------------------
if (__DEV__) {
  config.entry.app.push(
    `webpack-hot-middleware/client.js?path=${config.output.publicPath}__webpack_hmr`
  )
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new StyleLintPlugin()
  )
}

// Bundle Splitting
// ------------------------------------
if (!__TEST__) {
  const bundles = ['manifest']

  if (project.vendors && project.vendors.length) {
    bundles.unshift('vendor')
    config.entry.vendor = project.vendors
  }

  config.plugins.push(new webpack.optimize.CommonsChunkPlugin({ names: bundles }))
  config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
    name: 'app',
    async: 'common',
    minChunks: 2
  }))
}

// Production Optimizations
// ------------------------------------
if (__PROD__) {
  config.plugins.push(
    new webpack.optimize.ModuleConcatenationPlugin(),

    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),

    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /fr/),

    new webpack.optimize.UglifyJsPlugin({
      sourceMap: !!config.devtool,
      comments: false,
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      }
    }),

    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: path.join('..', project.reportDir, 'bundles.html'),
      defaultSizes: 'gzip'
    })
  )
}

module.exports = config
