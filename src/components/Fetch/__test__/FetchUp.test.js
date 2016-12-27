import React from 'react'
import { shallow, mount } from 'enzyme'
import FetchUp from '../FetchUp'
import Errors from '../../Errors/Errors'
import CatalogPreview from '../../Catalog/CatalogPreview'
import { fetchCatalog, fetchMetrics } from '../../../fetch/__mocks__/fetch'

import catalog from '../../../fetch/__test__/catalog.json'

describe('<FetchUp />', () => {
  const catalogPromise = {fetch: fetchCatalog, name: 'catalog', value: '1'}
  const metricsPromise = {fetch: fetchMetrics, name: 'metrics', value: '1'}

  describe('allStateReady()', () => {
    it('should return true when all states are define', () => {
      const wrapper = shallow(<FetchUp promises={[catalogPromise, metricsPromise]} />)

      wrapper.setState({catalog: 'catalog', metrics: 'metrics'})
      expect(wrapper.instance().allStateReady()).to.be.true
    })

    it('should return false when all states aren\'t define', () => {
      const wrapper = shallow(<FetchUp promises={[catalogPromise, metricsPromise]} />)

      wrapper.setState({catalog: 'catalog', metrics: undefined})
      expect(wrapper.instance().allStateReady()).to.be.false
    })
  })

  describe('render()', () => {
    describe('When a component is set in props', () => {
      it('should render component with state', () => {
        const catalogPreview = <CatalogPreview catalog={catalog} />
        const wrapper = mount(<FetchUp component={<CatalogPreview />} promises={[catalogPromise]} />)

        return wrapper
          .instance()
          .componentWillMount()
          .then(() => expect(wrapper).to.contain(catalogPreview))
      })
    })

    describe('When no component is set in props', () => {
      it('should render null', () => {
        const wrapper = shallow(<FetchUp />)
        expect(wrapper.html()).to.be.null
      })
    })

    describe('When an error is saved in errors state', () => {
      it('should render an Errors component', () => {
        const errors = [1, 2]
        const error = <Errors errors={errors} />
        const wrapper = shallow(<FetchUp />)

        wrapper.setState({errors})

        expect(wrapper).to.contain(error)
      })
    })
  })
})
