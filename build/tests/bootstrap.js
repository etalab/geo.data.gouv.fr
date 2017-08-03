const { JSDOM } = require('jsdom')
const moduleAlias = require('module-alias')
const path = require('path')

require('babel-register')()

moduleAlias.addAlias('common', path.join(__dirname, '../../src'))

// Remove the PUBLIC_URL, if defined
process.env.PUBLIC_URL = ''

process.env.INSPIRE_API_URL = 'inspire-api-url'

const jsdom = new JSDOM('<!doctype html><html><body></body></html>')
const exposedProperties = ['window', 'navigator', 'document']

global.window = jsdom.window
global.document = global.window.document

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
