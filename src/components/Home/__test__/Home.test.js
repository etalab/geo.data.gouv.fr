import React from 'react';
import { shallow } from 'enzyme';
import Home from '../Home'

import datasets from '../../../fetch/__test__/datasets.json'
jest.mock('../../../fetch/fetch');

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
