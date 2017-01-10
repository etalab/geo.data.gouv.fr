import React from 'react'
import { shallow } from 'enzyme'

import DatasetDataAvailability from '../CheckDataAvailability'

describe('<DatasetDataAvailability />', () => {
  describe('check()', () => {
    it('should return true when the array contains at least one element whith available at true', () => {
      const distributions = [{available: true}, {available: false}]
      const wrapper = shallow(<DatasetDataAvailability distributions={distributions} />)

      const result = wrapper.instance().check()

      expect(result.msg).to.equal('Au moins une des distribution est disponible.')
      expect(result.content).to.exist
      expect(result.valid).to.be.true
    })

    it('should return false when the array contains no elements whith available at true', () => {
      const distributions = [{available: false}, {available: false}]
      const wrapper = shallow(<DatasetDataAvailability distributions={distributions} />)

      const result = wrapper.instance().check()

      expect(result.msg).to.equal('Aucune distribution n\'a été trouvée.')
      expect(result.content).to.equal(undefined)
      expect(result.valid).to.equal(false)
    })

    it('should return false when the array is empty', () => {
      const distributions = []
      const wrapper = shallow(<DatasetDataAvailability distributions={distributions} />)

      const result = wrapper.instance().check()

      expect(result.msg).to.equal('Aucune distribution n\'a été trouvée.')
      expect(result.content).to.equal(undefined)
      expect(result.valid).to.equal(false)
    })

    it('should return false when the array is undefined', () => {
      const wrapper = shallow(<DatasetDataAvailability />)

      const result = wrapper.instance().check()

      expect(result.msg).to.equal('Aucune distribution n\'a été trouvée.')
      expect(result.content).to.equal(undefined)
      expect(result.valid).to.equal(false)
    })
  })
})
