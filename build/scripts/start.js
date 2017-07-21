const { development } = require('../../project.config')
const logger = require('../lib/logger')

logger.info('Starting server…')
require('../../server').listen(development.port, () => {
  logger.success(`Server is listening on port ${development.port}`)
})
