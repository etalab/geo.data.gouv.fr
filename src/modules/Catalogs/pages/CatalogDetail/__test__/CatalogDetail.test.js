import React from 'react'
import { shallow } from 'enzyme'

import ContentLoader from '../../../../../components/Loader/ContentLoader'
import Errors from '../../../../../components/Errors/Errors'

import catalog from '../../../../../fetch/__test__/catalog.json'
import metrics from '../../../../../fetch/__test__/metrics.json'

const CatalogDetail = require('proxyquire')('../CatalogDetail', {
  '../../../../fetch/fetch': require('../../../../../fetch/__mocks__/fetch')
}).default

describe('<CatalogDetail />', () => {

  describe('When all goes well', () => {

    it('should render CatalogDetail', () => {
      const wrapper = shallow(<CatalogDetail params={{catalogId: '1'}} />)

      wrapper.setState({catalog, metrics})

      expect(wrapper).to.contain(<h2>Rechercher dans les jeux de données du catalogue</h2>)
    })
  })

  describe('fetch', () => {

    describe('updateMetrics()', () => {
      it('should assign metrics to this.state ', () => {
        const wrapper = shallow(<CatalogDetail params={{catalogId: '1'}} />)

        return wrapper
          .instance()
          .updateMetrics()
          .then(() => expect(wrapper.state('metrics')).to.equal(metrics))
      })

      it('should add an error to this.state, catalogId is required', () => {
        const wrapper = shallow(<CatalogDetail params={{}}/>)

        return wrapper
          .instance()
          .updateMetrics()
          .then(() => expect(wrapper.state('errors')).to.contain('catalogId is required'))
      })

      it('should render a Errors component', () => {
        const wrapper = shallow(<CatalogDetail params={{}}/>)
        const errors = <Errors errors={['catalogId is required']} />

        return wrapper
          .instance()
          .componentWillMount()
          .then(() => expect(wrapper).to.contain(errors))
      })

      it('should add an error to this.state, metrics not found', () => {
        const wrapper = shallow(<CatalogDetail params={{catalogId: '0'}} />)

        return wrapper
          .instance()
          .updateMetrics()
          .then(() => expect(wrapper.state('errors')).to.contain('metrics not found'))
      })
    })

    describe('updateCatalog()', () => {
      it('should assign catalog to this.state', () => {
        const wrapper = shallow(<CatalogDetail params={{catalogId: '1'}} />)
        return wrapper
          .instance()
          .updateCatalog()
          .then(() => expect(wrapper.state('catalog')).to.equal(catalog))
      })

      it('should add an error to this.state, catalogId is required', () => {
        const wrapper = shallow(<CatalogDetail params={{}}/>)

        return wrapper
          .instance()
          .updateCatalog()
          .then(() => expect(wrapper.state('errors')).to.contain('catalogId is required'))
      })

      it('should add an error to this.state, catalog not found', () => {
        const wrapper = shallow(<CatalogDetail params={{catalogId: '0'}} />)

        return wrapper
          .instance()
          .updateCatalog()
          .then(() => expect(wrapper.state('errors')).to.contain('catalog not found'))
      })
    })

    describe('componentWillMount()', () => {
      it('should assign catalog and metrics to this.state when data is retrieved', () => {
        const wrapper = shallow(<CatalogDetail params={{catalogId: '1'}} />)
        return wrapper
          .instance()
          .componentWillMount()
          .then(() => {
            expect(wrapper.state('metrics')).to.deep.equal(metrics)
            expect(wrapper.state('catalog')).to.deep.equal(catalog)
            expect(wrapper.state('errors')).to.deep.equal([])
          })
      })
    })

    it('should render a loader when no catalog is fetch', () => {
      const loader = <ContentLoader />
      const wrapper = shallow(<CatalogDetail params={{catalogId: '0'}} />)
      expect(wrapper.containsMatchingElement(loader)).to.be.true
    })
  })

})
