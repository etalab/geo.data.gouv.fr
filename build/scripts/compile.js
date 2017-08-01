const fs = require('fs-extra')
const path = require('path')
const mkdirp = require('mkdirp')
const chalk = require('chalk')
const gzipSize = require('gzip-size')
const filesize = require('filesize')
const webpack = require('webpack')

const logger = require('../lib/logger')
const webpackConfig = require('../webpack.config')
const project = require('../../project.config')

const runWebpackCompiler = (webpackConfig) =>
  new Promise((resolve, reject) => {
    webpack(webpackConfig).run((err, stats) => {
      if (err) {
        logger.error('Webpack compiler encountered a fatal error.', err)
        return reject(err)
      }

      const jsonStats = stats.toJson()
      if (jsonStats.errors.length > 0) {
        logger.error('Webpack compiler encountered errors.')
        logger.log(jsonStats.errors.join('\n'))
        return reject(new Error('Webpack compiler encountered errors'))
      } else if (jsonStats.warnings.length > 0) {
        logger.warn('Webpack compiler encountered warnings.')
        logger.log(jsonStats.warnings.join('\n'))
      }
      resolve(stats)
    })
  })

const computeSizeLabel = (current, previous) => {
  const diff = previous ? current - previous : 0

  if (diff > 0) {
    return `${filesize(current)} (${chalk.red(`+ ${filesize(diff)}`)})`
  } else if (diff < 0) {
    return `${filesize(current)} (${chalk.green(`- ${filesize(-diff)}`)})`
  }

  return filesize(current)
}

const retrievePreviousAssets = assetsSummaryPath => {
  try {
    return JSON
      .parse(fs.readFileSync(assetsSummaryPath, 'utf-8'))
      .reduce((acc, asset) => {
        acc[asset.genericName] = asset
        return acc
      }, {})
  } catch (err) {
    logger.warn('Previous bundle stats could not be loaded, bundles will not be compared.', err)
  }

  return null
}

const displayAssetsSummary = (assets, previousAssets) => {
  const longestPath = Math.max.apply(null, assets.map(a => a.path.length))

  logger.log()
  logger.log('File sizes after gzip:')
  logger.log()
  assets.forEach(asset => {
    const previous = previousAssets ? previousAssets[asset.genericName] : null
    const sizeLabel = computeSizeLabel(asset.gzip, previous ? previous.gzip : null)

    let padding = ''
    if (asset.path.length < longestPath) {
      padding = ' '.repeat(longestPath - asset.path.length)
    }

    logger.log(
      `  ${chalk.dim(asset.folder + path.sep) +
      chalk.cyan(asset.genericName)}` +
      padding +
      `  ${sizeLabel}`
    )
  })
  logger.log()

  const total = assets.reduce((sum, a) => a.gzip + sum, 0)
  let previousTotal = null

  if (previousAssets) {
    previousTotal = Object.values(previousAssets).reduce((sum, a) => a.gzip + sum, 0)
  }

  const sizeLabel = computeSizeLabel(total, previousTotal)

  const totalLabel = 'TOTAL'
  logger.log(
    `  ${chalk.cyan(totalLabel)}` +
    ' '.repeat(longestPath - totalLabel.length) +
    `  ${sizeLabel}`
  )
  logger.log()
}

const saveAssetsSummary = (assets, assetsSummaryPath) => {
  try {
    mkdirp.sync(path.dirname(assetsSummaryPath))
    fs.writeFileSync(assetsSummaryPath, JSON.stringify(assets, null, 2), 'utf-8')

    logger.success(`Saved JSON bundle stats in ${chalk.bold(assetsSummaryPath)}.`)
  } catch (err) {
    logger.warn(`Could not save JSON bundle stats in ${chalk.bold(assetsSummaryPath)}.`, err)
  }
}

const compile = () => {
  const assetsSummaryPath = path.resolve(path.join(project.reportDir, 'bundles.json'))

  logger.info('Starting compiler…')
  logger.info('Target application environment: ' + chalk.bold(project.env))

  runWebpackCompiler(webpackConfig)
    .then(stats => {
      const assets = stats.toJson().assets
        .filter(asset => !/\.map$/.test(asset.name))
        .map(asset => {
          const contents = fs.readFileSync(path.join(project.outDir, asset.name))
          const gsize = gzipSize.sync(contents)

          const folder = path.join(project.outDir, path.dirname(asset.name))
          const name = path.basename(asset.name)

          // Can’t include a `.` in the webpack entries, or this will break
          const genericName = name.replace(/^(.*?\.)[^.]+\.(.*)$/, '$1$2')

          return {
            folder,
            name,
            genericName,

            path: `${folder}${path.sep}${genericName}`,

            size: asset.size,
            gzip: gsize
          }
        })

      assets.sort((a, b) => b.gzip - a.gzip)

      const previousAssets = retrievePreviousAssets(assetsSummaryPath)

      displayAssetsSummary(assets, previousAssets)
      saveAssetsSummary(assets, assetsSummaryPath)

      logger.info(`Copying static assets from ./public to ./${project.outDir}.`)
      fs.copySync(
        path.resolve(project.basePath, 'public'),
        path.resolve(project.basePath, project.outDir)
      )

      logger.success(`Compiler finished successfully! See ./${project.outDir}.`)
    })
    .catch((err) => logger.error('Compiler encountered errors.', err))
}

compile()
