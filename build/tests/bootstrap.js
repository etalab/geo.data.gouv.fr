import 'jsdom-global/register'
import 'ignore-styles'

import moduleAlias from 'module-alias'
import path from 'path'

import chai from 'chai'
import chaiEnzyme from 'chai-enzyme'

import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-15'

Enzyme.configure({ adapter: new Adapter() })

moduleAlias.addAlias('common', path.join(__dirname, '../../src'))

process.env.PUBLIC_URL = ''
process.env.GEODATA_API_URL = 'geodata-api-url'

global.expect = chai.expect
chai.use(chaiEnzyme())
