import React from 'react'
import { shallow, mount } from 'enzyme'

const Datasets = require('proxyquire')('../Datasets', {
  '../../fetch/fetch': require('../../../fetch/__mocks__/fetch'),
  'react-router': {
    browserHistory: {push:  () => {}}
  }
}).default

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

      expect(wrapper.state('page')).toEqual(1)
      expect(wrapper.state('offset')).toEqual(0)
      expect(wrapper.state('filters')).toEqual([{name: 'filter1', value: 'value1'}, {name: 'filter2', value: 'value2'}])
    })
  })

  describe('removeFilter()', () => {
    it('should remove filter and reset page and offset', () => {
      wrapper.instance().removeFilter({name: 'filter1', value: 'value1'})

      expect(wrapper.state('page')).toEqual(1)
      expect(wrapper.state('offset')).toEqual(0)
      expect(wrapper.state('filters')).toEqual([])
    })
  })

  describe('userSearch()', () => {
    it('should change textInput and reset datasets, offset and page', () => {
      const textInput = 'new seach'
      wrapper.instance().userSearch(textInput)

      expect(wrapper.state('textInput')).toEqual(textInput)
      expect(wrapper.state('filters')).toEqual([{name: 'filter1', value: 'value1'}])
      expect(wrapper.state('offset')).toEqual(0)
      expect(wrapper.state('page')).toEqual(1)
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
        .componentWillMount()
        .then(() => {
          wrapper.instance().handleChangePage({selected: 0})
          expect(wrapper.state('offset')).toEqual(0)
          expect(wrapper.state('page')).toEqual(1)
        })
    })
  })

})
