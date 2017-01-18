import React from 'react'
import { shallow, mount } from 'enzyme'
import { buildSearchQuery } from '../Datasets'

const Datasets = require('proxyquire')('../Datasets', {
  '../../../../fetch/fetch': require('../../../../../fetch/__mocks__/fetch'),
  'react-router': {
    browserHistory: {push:  () => {}}
  }
}).default

describe('buildSearchQuery()', () => {
  it('should return a query', () => {
    const componentState = {
      textInput: '42',
      page: 2,
      filters: [
        {name: 'keywords', value: 'keyword1'},
        {name: 'keywords', value: 'keyword2'},
        {name: 'organizations', value: 'foo'},
      ],
    }
    const expectedUrl = 'q=42&page=2&keywords=keyword1&keywords=keyword2&organizations=foo'
    const builQuery = buildSearchQuery(
      componentState.textInput,
      componentState.filters,
      componentState.page,
    )
    expect(builQuery).to.equal(expectedUrl)
  })
})

describe('<Datasets />', () => {

  let wrapper
  beforeEach(() => {
    const query = {
      textInput: 'text',
      page: 2,
      filters: [{name: 'filter1', value: 'value1'}],
    }
    wrapper = shallow(<Datasets pathname={'pathname'} query={query} />)
  })

  describe('addFilter()', () => {
    it('should add filter and reset page and offset', () => {
      wrapper.instance().addFilter({name: 'filter2', value: 'value2'})

      expect(wrapper.state('page')).to.equal(1)
      expect(wrapper.state('filters')).to.deep.equal([{name: 'filter1', value: 'value1'}, {name: 'filter2', value: 'value2'}])
    })
  })

  describe('removeFilter()', () => {
    it('should remove filter and reset page and offset', () => {
      wrapper.instance().removeFilter({name: 'filter1', value: 'value1'})

      expect(wrapper.state('page')).to.equal(1)
      expect(wrapper.state('filters')).to.deep.equal([])
    })
  })

  describe('userSearch()', () => {
    it('should change textInput and reset datasets, offset and page', () => {
      const textInput = 'new seach'
      wrapper.instance().userSearch(textInput)

      expect(wrapper.state('textInput')).to.deep.equal(textInput)
      expect(wrapper.state('filters')).to.deep.equal([{name: 'filter1', value: 'value1'}])
      expect(wrapper.state('page')).to.equal(1)
    })
  })

  describe('handleChangePage()', () => {
    it('should update page and offset', () => {
      const query = {
        textInput: 'text',
        page: 2,
        filters: [{name: 'filter1', value: 'value1'}],
      }
      const wrapper = mount(<Datasets pathname={'pathname'} query={query} />)

      return wrapper.instance()
        .componentDidMount()
        .then(() => {
          wrapper.instance().handleChangePage({selected: 0})
          expect(wrapper.state('page')).to.equal(1)
        })
    })
  })

})
