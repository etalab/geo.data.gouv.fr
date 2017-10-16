const webpack = require('webpack')

const envVariables = [
  'NODE_ENV',

  'PUBLIC_URL',

  'DATAGOUV_API_URL',
  'DATAGOUV_API_KEY',

  'PUBLICATION_BASE_URL',
  'GEODATA_API_URL',

  'PIWIK_URL',
  'PIWIK_SITE_ID'
]

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

    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env': envVariables.reduce((env, entry) => {
          env[entry] = JSON.stringify(process.env[entry])
          return env
        }, {})
      })
    )

    return config
  }
}
