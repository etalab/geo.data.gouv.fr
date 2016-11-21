import React from 'react'
import { shallow } from 'enzyme'
import ContentLoader from '../../Loader/ContentLoader'

import catalog from '../../../fetch/__test__/catalog.json'
import metrics from '../../../fetch/__test__/metrics.json'

const CatalogDetail = require('proxyquire')('../CatalogDetail', {
  '../../fetch/fetch': require('../../../fetch/__mocks__/fetch')
}).default

describe('<CatalogDetail />', () => {

  describe('When all goes well', () => {

    it('should render CatalogDetail', () => {
      const wrapper = shallow(<CatalogDetail params={{catalogId: '1'}} />)

      wrapper.setState({catalog, metrics})
      expect(wrapper.find('#catalog-detail').length).toEqual(1)
    })
  })

  describe('fetch', () => {

    describe('updateMetrics()', () => {
      it('Should assign metrics to this.state ', () => {
        const wrapper = shallow(<CatalogDetail params={{catalogId: '1'}} />)

        return wrapper
          .instance()
          .updateMetrics()
          .then(() => expect(wrapper.state('metrics')).toEqual(metrics))
      })

      it('Should add an error to this.state, catalogId is required', () => {
        const wrapper = shallow(<CatalogDetail params={{}}/>)

        return wrapper
          .instance()
          .updateMetrics()
          .then(() => expect(wrapper.state('errors')).toContain('catalogId is required'))
      })

      it('Should add an error to this.state, metrics not found', () => {
        const wrapper = shallow(<CatalogDetail params={{catalogId: '0'}} />)

        return wrapper
          .instance()
          .updateMetrics()
          .then(() => expect(wrapper.state('errors')).toContain('metrics not found'))
      })
    })

    describe('updateCatalog()', () => {
      it('Should assign catalog to this.state', () => {
        const wrapper = shallow(<CatalogDetail params={{catalogId: '1'}} />)
        return wrapper
          .instance()
          .updateCatalog()
          .then(() => expect(wrapper.state('catalog')).toEqual(catalog))
      })

      it('Should add an error to this.state, catalogId is required', () => {
        const wrapper = shallow(<CatalogDetail params={{}}/>)

        return wrapper
          .instance()
          .updateCatalog()
          .then(() => expect(wrapper.state('errors')).toContain('catalogId is required'))
      })

      it('Should add an error to this.state, catalog not found', () => {
        const wrapper = shallow(<CatalogDetail params={{catalogId: '0'}} />)

        return wrapper
          .instance()
          .updateCatalog()
          .then(() => expect(wrapper.state('errors')).toContain('catalog not found'))
      })
    })

    describe('componentWillMount()', () => {
      it('Should assign catalog and metrics to this.state when data is retrieved', () => {
        const wrapper = shallow(<CatalogDetail params={{catalogId: '1'}} />)
        return wrapper
          .instance()
          .componentWillMount()
          .then(() => {
            expect(wrapper.state('metrics')).toEqual(metrics)
            expect(wrapper.state('catalog')).toEqual(catalog)
            expect(wrapper.state('errors')).toEqual([])
          })
      })
    })

    it('should render a loader when no catalog is fetch', () => {
      const loader = <ContentLoader />
      const wrapper = shallow(<CatalogDetail params={{catalogId: '0'}} />)
      expect(wrapper.containsMatchingElement(loader)).toBe(true)
    })
  })

})
