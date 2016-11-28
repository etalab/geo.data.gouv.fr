import React from 'react'
import { shallow, mount } from 'enzyme'

const Datasets = require('proxyquire')('../Datasets', {
  '../../fetch/fetch': require('../../../fetch/__mocks__/fetch'),
  'react-router': {
    browserHistory: {push:  () => {}}
  }
}).default

describe('<Datasets />', () => {
  const query = {
    textInput: 'text',
    page: 2,
    filters: [{name: 'filter1', value: 'value1'}],
  }

  describe('addFilter()', () => {
    it('should add filter and reset page and offset', () => {
      const wrapper = shallow(<Datasets pathname={'pathname'} query={query} />)

      wrapper.instance().addFilter({name: 'filter2', value: 'value2'})

      expect(wrapper.state('page')).toEqual(1)
      expect(wrapper.state('offset')).toEqual(0)
      expect(wrapper.state('filters')).toEqual([{name: 'filter1', value: 'value1'}, {name: 'filter2', value: 'value2'}])
    })
  })

  describe('removeFilter()', () => {
    it('should remove filter and reset page and offset', () => {
      const wrapper = shallow(<Datasets pathname={'pathname'} query={query} />)

      wrapper.instance().removeFilter({name: 'filter1', value: 'value1'})

      expect(wrapper.state('page')).toEqual(1)
      expect(wrapper.state('offset')).toEqual(0)
      expect(wrapper.state('filters')).toEqual([])
    })
  })

  describe('userSearch()', () => {
    it('should change textInput and reset filters, datasets, offset and page', () => {
      const wrapper = shallow(<Datasets pathname={'pathname'} query={query} />)
      const textInput = 'new search'
      wrapper.instance().userSearch(textInput)

      expect(wrapper.state('textInput')).toEqual(textInput)
      expect(wrapper.state('filters')).toEqual([])
      expect(wrapper.state('offset')).toEqual(0)
      expect(wrapper.state('page')).toEqual(1)
    })
  })

  describe('handleChangePage()', () => {
    it('should update page and offset', () => {
      const wrapper = mount(<Datasets pathname={'pathname'} query={query} />)

      return wrapper.instance()
        .componentWillMount()
        .then(() => {
          wrapper.instance().handleChangePage({selected: 0})
          expect(wrapper.state('offset')).toEqual(0)
          expect(wrapper.state('page')).toEqual(1)
        })
    })
  })

})
