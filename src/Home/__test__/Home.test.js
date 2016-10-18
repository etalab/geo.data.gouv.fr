import React from 'react';
import { shallow } from 'enzyme';
import CircularProgress from 'material-ui/CircularProgress'
import Home from '../Home'
import { mountWithContext } from '../../../test/jsdom-setup'

import datasets from '../../fetch/__test__/datasets.json'
jest.mock('../../fetch/fetch');

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
