import React from 'react'
import { shallow } from 'enzyme'

import { parseQuery, _extractFilters, buildSearchQuery } from '../WrappedDatasets'

const WrappedDatasets = require('proxyquire')('../WrappedDatasets', {
  'react-router': {
    browserHistory: {push:  () => {}}
  }
}).default

describe('_extractFilters', () => {
  it('should return filters array', () => {
    const qs = { keyword: 'bar', organization: 'foo' }
    const filters = [
      {name: 'keyword', value: 'bar'},
      {name: 'organization', value: 'foo'},
    ]
    const extractedFilters = _extractFilters(qs)

    expect(extractedFilters).to.deep.equal(filters)
  })

  it('should return only allowed filters', () => {
    const qs = { keyword: 'bar', q: 'foo' }
    const filters = [
      {name: 'keyword', value: 'bar'},
    ]
    const extractedFilters = _extractFilters(qs)

    expect(extractedFilters).to.deep.equal(filters)
  })

  it('should create one items for each value', () => {
    const qs = { keyword: ['foo', 'bar'] }
    const filters = [
      {name: 'keyword', value: 'foo'},
      {name: 'keyword', value: 'bar'},
    ]
    const extractedFilters = _extractFilters(qs)

    expect(extractedFilters).to.deep.equal(filters)
  })
})

describe('parseQuery', () => {
  it('should create an array of filters', () => {
    const query = {
      q: '42',
      page: '2',
      keyword: ['keyword1', 'keyword2'],
      organization: 'foo'
    }
    const result = parseQuery(query)

    expect(result).to.deep.equal(
      {
        textInput: '42',
        page: '2',
        filters: [
          {name: 'keyword', value: 'keyword1'},
          {name: 'keyword', value: 'keyword2'},
          {name: 'organization', value: 'foo'},
        ],
      }
    )
  })
})

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

describe('<WrappedDatasets />', () => {

  let wrapper
  beforeEach(() => {
    const location = {
      query: {
        textInput: 'text',
        page: 2,
        filters: [{name: 'filter1', value: 'value1'}],
      }
    }
    wrapper = shallow(<WrappedDatasets pathname={'pathname'} location={location} />)
  })

  describe('updateQuery()', () => {
    it('should update the query', () => {
      wrapper.instance().updateQuery({
        textInput: 'text new',
        page: 3,
        filters: [{name: 'filter2', value: 'value2'}],
      })

      expect(wrapper.state('textInput')).to.equal('text new')
      expect(wrapper.state('page')).to.equal(3)
      expect(wrapper.state('filters')).to.deep.equal([{name: 'filter2', value: 'value2'}])
    })
  })
})
