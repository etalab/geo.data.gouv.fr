import React from 'react'
import { shallow } from 'enzyme'
import CatalogDetail from '../CatalogDetail'
import { mountWithContext } from '../../../test/jsdom-setup'

import catalog from '../../fetch/__test__/catalog.json'
import metrics from '../../fetch/__test__/metrics.json'
jest.mock('../../fetch/fetchMetrics')
jest.mock('../../fetch/fetchCatalog')

describe('<CatalogDetail />', () => {

  describe('When all goes well', () => {

    it('should render CatalogDetail', () => {
      const wrapper = mountWithContext(<CatalogDetail params={{catalogId: '1'}} />)

      return wrapper
        .instance()
        .componentWillMount()
        .then(() => {
          expect(wrapper.find('#catalog-detail').length).toEqual(1)
        })
      })
    })

  describe('fetch', () => {

    it('should set metrics', () => {
      const wrapper = shallow(<CatalogDetail params={{catalogId: '1'}} />)

      return wrapper
        .instance()
        .updateMetrics()
        .then(() => expect(wrapper.state('metrics')).toEqual(metrics))
    })

    it('should set catalog', () => {
      const wrapper = shallow(<CatalogDetail params={{catalogId: '1'}} />)
      return wrapper
        .instance()
        .updateCatalog()
        .then(() => expect(wrapper.state('catalog')).toEqual(catalog))
    })

    it('should set catalog and metrics', () => {
      const wrapper = shallow(<CatalogDetail params={{catalogId: '1'}} />)
      return wrapper
        .instance()
        .componentWillMount()
        .then(() => expect(wrapper.state('metrics')).toEqual(metrics))
    })

    it('should render an empty div', () => {
      const wrapper = shallow(<CatalogDetail params={{catalogId: '0'}} />)
      expect(wrapper.html()).toEqual("<div></div>")
    })
  })

  describe('Error', () => {
    describe('Metrics error', () => {
      it('Should return an error, catalogId is required', () => {
        const wrapper = shallow(<CatalogDetail params={{}}/>)

        expect(wrapper.state('errors')).toEqual(["Error: catalogId is required"])
      })

      it('Should return an error, metrics not found', () => {
        const wrapper = shallow(<CatalogDetail params={{catalogId: '0'}} />)

        return wrapper
          .instance()
          .updateMetrics()
          .then(() => expect(wrapper.state('errors')).toEqual(["Error: metrics not found"]))
      })
    })

    describe('Catalog error', () => {
      it('Should return an error, catalogId is required', () => {
        const wrapper = shallow(<CatalogDetail params={{}}/>)

        return wrapper
          .instance()
          .updateMetrics()
          .then(() => expect(wrapper.state('errors')).toEqual(["Error: catalogId is required"]))
      })

      it('Should return an error, catalog not found', () => {
        const wrapper = shallow(<CatalogDetail params={{catalogId: '0'}} />)

        return wrapper
          .instance()
          .updateMetrics()
          .then(() => expect(wrapper.state('errors')).toEqual(["Error: metrics not found"]))
      })
    })

  })

})
