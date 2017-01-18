import React from 'react'
import { shallow } from 'enzyme'

import CheckProducers from '../CheckProducers'

describe('<CheckProducers />', () => {
  describe('check()', () => {
    it('should return true when the array contains at least one element', () => {
      const organizations = ['producteur']
      const wrapper = shallow(<CheckProducers organizations={organizations} />)

      const result = wrapper.instance().check()

      expect(result).to.deep.equal({
        content: organizations,
        msg: 'Au moins un producteur est identifié.',
        valid: true})
    })

    it('should return false when the array contains no elements', () => {
      const organizations = []
      const wrapper = shallow(<CheckProducers organizations={organizations} />)

      const result = wrapper.instance().check()

      expect(result).to.deep.equal({
        msg: 'Le producteur n\'a pas été identifié.',
        valid: false})
    })

    it('should return false when the array is undefined', () => {
      const wrapper = shallow(<CheckProducers />)

      const result = wrapper.instance().check({msg: '', content: {}, valid: false})

      expect(result).to.deep.equal({
        msg: 'Le producteur n\'a pas été identifié.',
        valid: false})
    })
  })
})
