import 'jsdom-global/register'
import 'ignore-styles'

import moduleAlias from 'module-alias'
import path from 'path'

import chai from 'chai'
import chaiEnzyme from 'chai-enzyme'

moduleAlias.addAlias('common', path.join(__dirname, '../../src'))

process.env.PUBLIC_URL = ''
process.env.INSPIRE_API_URL = 'inspire-api-url'

global.expect = chai.expect
chai.use(chaiEnzyme())
