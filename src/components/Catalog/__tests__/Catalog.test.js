import React from 'react'
import { mount } from 'enzyme'
import CatalogPreview from '../CatalogPreview'

import catalog from '../../../fetch/__test__/catalog.json'

const Catalog = require('proxyquire')('../Catalog', {
  '../../fetch/fetch': require('../../../fetch/__mocks__/fetch')
}).default

describe('<Catalog />', () => {

  describe('When all goes well', () => {

    it('Should assign catalog to this.state', () => {
      const wrapper = mount(<Catalog catalogId={'1'} />)
      const test = <CatalogPreview catalog={catalog} />

      return wrapper.instance()
        .componentWillMount()
        .then(() => {
          expect(wrapper).to.contain(test)
        })
    })
  })
})
