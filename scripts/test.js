process.env.NODE_ENV = 'test';
process.env.PUBLIC_URL = '';

require('babel-register')();

var jsdom = require('jsdom').jsdom;

var exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = window.navigator = {
  userAgent: 'node.js',
  platform: 'node.js',
};

var chai = require('chai')
var chaiEnzyme = require('chai-enzyme')

global.expect = chai.expect
chai.use(chaiEnzyme())
