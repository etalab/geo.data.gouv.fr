import React from 'react';
import { shallow } from 'enzyme';

import metrics from '../../../fetch/__test__/globalMetrics.json'

const Home = require('proxyquire')('../Home', {
  '../../fetch/fetch': require('../../../fetch/__mocks__/fetch')
}).default

describe('<Home />', () => {

  describe('fetch', () => {
    it('Should set metrics', () => {
      const wrapper = shallow(<Home />);
      return wrapper
        .instance()
        .componentWillMount()
        .then(() => expect(wrapper.state('metrics')).toEqual(metrics))
        .then(() => expect(wrapper.state('errors')).toEqual([]))
    });
  })

})
