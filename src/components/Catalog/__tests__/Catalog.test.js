import React from 'react'
import { shallow, mount } from 'enzyme'
import Loader from '../../Loader/Loader'
import CatalogPreview from '../CatalogPreview/CatalogPreview'

import catalog from '../../../fetch/__test__/catalog.json'
import metrics from '../../../fetch/__test__/metrics.json'

const Catalog = require('proxyquire')('../Catalog', {
  '../../fetch/fetch': require('../../../fetch/__mocks__/fetch')
}).default

describe('<Catalog />', () => {

  describe('When all goes well', () => {
    let wrapper

    beforeEach(() => {
      wrapper = shallow(<Catalog catalog={catalog} />)
    })

    it('should display the name of the catalog', () => {
      expect(wrapper.contains(catalog.name)).to.be.true
    })

    it('should display <CatalogPreview />', () => {
      const wrapper = shallow(<Catalog catalog={catalog} />)
      const catalogPreview = <CatalogPreview metrics={metrics} />

      expect(wrapper.containsMatchingElement(catalogPreview)).to.be.true
    })

  })

})
