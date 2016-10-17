import React from 'react'
import { shallow } from 'enzyme'
import CatalogDetail from '../CatalogDetail'
import { mountWithContext } from '../../../test/jsdom-setup'

import catalog from '../../fetch/__test__/catalog.json'
import metrics from '../../fetch/__test__/metrics.json'
jest.mock('../../fetch/fetchMetrics')
jest.mock('../../fetch/fetchCatalog')

describe('<CatalogDetail />', () => {

  describe('fetch', () => {
    const wrapper = mountWithContext(<CatalogDetail params={{catalogId: '1'}} />)

    it('should set metrics', () => {
      wrapper
        .instance()
        .componentWillMount()
        .then(() => expect(wrapper.state('metrics')).toEqual(metrics))
    })

    it('should set catalog', () => {
      wrapper
        .instance()
        .componentWillMount()
        .then(() => expect(wrapper.state('catalog')).toEqual(catalog))
    })

    it('should render an empty div', () => {
      const wrapper = shallow(<CatalogDetail params={{catalogId: '0'}} />)
      expect(wrapper.html()).toEqual("<div></div>")
    })
  })

})
