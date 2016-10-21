import React from 'react'
import { shallow } from 'enzyme'
import Loader from '../../Loader/Loader'
import Catalog from '../Catalog'
import CatalogPreview from '../CatalogPreview/CatalogPreview'
import { mountWithContext } from '../../../config/jsdom-setup'

import catalog from '../../../fetch/__test__/catalog.json'
import metrics from '../../../fetch/__test__/metrics.json'
jest.mock('../../../fetch/fetch')

describe('<Catalog />', () => {

  describe('When all goes well', () => {
    let wrapper

    beforeEach(() => {
      wrapper = shallow(<Catalog catalog={catalog} />)
    })

    it('should display the name of the catalog', () => {
      expect(wrapper.contains(catalog.name)).toBe(true)
    })

    it('should display <CatalogPreview />', () => {
      const wrapper = mountWithContext(<Catalog catalog={catalog} />)
      const catalogPreview = <CatalogPreview metrics={metrics} />

      return wrapper
        .instance()
        .componentWillMount()
        .then(() => {
          expect(wrapper.contains(catalogPreview)).toBe(true)
        })
    })

  })

  describe('fetch metrics', () => {
    it('should set metrics', () => {
      const wrapper = mountWithContext(<Catalog catalog={catalog} />)

      return wrapper
        .instance()
        .componentWillMount()
        .then(() => expect(wrapper.state('metrics')).toEqual(metrics))
    })

    it('should display a loading', () => {
      const loader = mountWithContext(<Loader component={<div></div>} value={undefined} />)
      const wrapper = mountWithContext(<Catalog catalog={catalog} />)

      expect(wrapper.html()).toContain(loader.html())
    })
  })

})
