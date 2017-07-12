const { development } = require('../../project.config')
const logger = require('../lib/logger')

logger.info('Starting server…')
require('../../server').listen(development.port, development.host, () => {
  logger.success(`Server is running at http://${development.host}:${development.port}`)
})
