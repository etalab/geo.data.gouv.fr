import React from 'react';
import { shallow } from 'enzyme';

import datasets from '../../../fetch/__test__/datasets.json'

const Home = require('proxyquire')('../Home', {
  '../../fetch/fetch': require('../../../fetch/__mocks__/fetch')
}).default

describe('<Home />', () => {

  describe('fetch', () => {
    it('Should set datasets', () => {
      const wrapper = shallow(<Home />);
      return wrapper
        .instance()
        .componentWillMount()
        .then(() => expect(wrapper.state('datasets')).toEqual(datasets))
        .then(() => expect(wrapper.state('errors')).toEqual([]))
    });
  })

})
