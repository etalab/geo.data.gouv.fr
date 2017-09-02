const express = require('express')
const webpack = require('webpack')
const compression = require('compression')

const serverConfig = require('../webpack.config')
const clientConfig = require('geodatagouv-client/build/webpack.config')

const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackHotServerMiddleware = require('webpack-hot-server-middleware')

const port = process.env.PORT || 3000

const publicPath = clientConfig.output.publicPath
const outputPath = clientConfig.output.path

const app = express()

app.use(compression())

let isBuilt = false
const done = () => !isBuilt && app.listen(port, () => {
  isBuilt = true
  console.log('BUILD COMPLETE -- Listening @ http://localhost:3000')
})

const __PROD__ = process.env === 'production'

if (!__PROD__) {
  const compiler = webpack([clientConfig, serverConfig])
  const clientCompiler = compiler.compilers[0]

  app.use(webpackDevMiddleware(compiler, {
    publicPath,
    stats: { colors: true }
  }))
  app.use(webpackHotMiddleware(clientCompiler))
  app.use(webpackHotServerMiddleware(compiler, {
    serverSideRender: true,
    chunkName: 'server'
  }))

  compiler.plugin('done', done)
} else {
  webpack([clientConfig, serverConfig]).run((err, stats) => {
    console.log(err)

    const clientStats = stats.toJson().children[0]
    console.log(clientStats.assetsByChunkName)

    const serverRender = require('../dist/server.js').default
    console.log(serverRender)

    app.use(publicPath, express.static(outputPath))
    app.use(serverRender({ clientStats }))

    done()
  })

}
