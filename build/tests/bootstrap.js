// Remove the PUBLIC_URL, if defined
process.env.PUBLIC_URL = ''

process.env.INSPIRE_API_URL = 'inspire-api-url'

require('babel-register')()

const { jsdom } = require('jsdom')
const moduleAlias = require('module-alias')
const path = require('path')

moduleAlias.addAlias('common', path.join(__dirname, '../../src'))

const exposedProperties = ['window', 'navigator', 'document']

global.document = jsdom('<!doctype html><html><body></body></html>')
global.window = document.defaultView
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property)
    global[property] = document.defaultView[property]
  }
})

global.navigator = window.navigator = {
  userAgent: 'node.js',
  platform: 'node.js',
}

const chai = require('chai')
const chaiEnzyme = require('chai-enzyme')

global.expect = chai.expect
chai.use(chaiEnzyme())
