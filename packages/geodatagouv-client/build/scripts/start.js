const { port, env } = require('../../project.config')
const logger = require('../lib/logger')

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = env
}

logger.info('Starting server…')
require('../../server').listen(port, () => {
  logger.success(`Server is listening on port ${port}`)
})
