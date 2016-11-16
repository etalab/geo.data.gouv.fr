import React from 'react'
import { shallow } from 'enzyme'
import DatasetProducers from '../CheckProducers'

describe('<DatasetProducers />', () => {
  describe('check()', () => {
    it('should return true when the array contains at least one element', () => {
      const organizations = ['producteur']
      const wrapper = shallow(<DatasetProducers organizations={organizations} />)

      const result = wrapper.instance().check()

      expect(result).toEqual({
        msg: 'Au moins un producteur est identifié.',
        valid: true})
    })

    it('should return false when the array contains no elements', () => {
      const organizations = []
      const wrapper = shallow(<DatasetProducers organizations={organizations} />)

      const result = wrapper.instance().check()

      expect(result).toEqual({
        msg: 'Le producteur n\'a pas été identifié.',
        valid: false})
    })

    it('should return false when the array is undefined', () => {
      const wrapper = shallow(<DatasetProducers />)

      const result = wrapper.instance().check({msg: '', content: {}, valid: false})

      expect(result).toEqual({
        msg: 'Le producteur n\'a pas été identifié.',
        valid: false})
    })
  })
})
