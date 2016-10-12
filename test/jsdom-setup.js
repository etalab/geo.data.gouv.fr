import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { jsdom } from 'jsdom';
import React from 'react';
import { mount } from 'enzyme';

const exposedProperties = ['window', 'navigator', 'document'];

export const mountWithContext = (node) => mount(node, {
  context: {
    muiTheme: getMuiTheme(),
  },
  childContextTypes: {
    muiTheme: React.PropTypes.object.isRequired,
  }
});

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};
