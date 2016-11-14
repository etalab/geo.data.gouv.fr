import React from 'react'
import { shallow } from 'enzyme'
import DatasetChecklist from '../DatasetChecklist'
import CheckItem from '../../CheckItem/CheckItem'

describe('<DatasetChecklist />', () => {

  describe('checkLicense()', () => {
    it('should be true for odbl license', () => {
      const wrapper = shallow(<DatasetChecklist license={'odbl'} />)

      const valid = wrapper.instance().checkLicense()

      expect(valid).toEqual(<CheckItem name={'Licence'} valid={true} />)
    })

    it('should be true for fr-lo license', () => {
      const wrapper = shallow(<DatasetChecklist license={'fr-lo'} />)

      const valid = wrapper.instance().checkLicense()

      expect(valid).toEqual(<CheckItem name={'Licence'} valid={true} />)
    })

    it('should be false for any other licenses and specify the error', () => {
      const wrapper = shallow(<DatasetChecklist license={'unk-license'} />)

      const valid = wrapper.instance().checkLicense()

      expect(valid).toEqual(<CheckItem name={'Licence'} valid={false} msg={'La licence unk-license n\'est pas reconnue.'} />)
    })

    it('should be false when license is undefined and specify the error', () => {
      const wrapper = shallow(<DatasetChecklist license={undefined} />)

      const valid = wrapper.instance().checkLicense()

      expect(valid).toEqual(<CheckItem name={'Licence'} valid={false} msg={'Aucune licence n\'a pu être trouvée.'} />)
    })
  })

  describe('_checkArray()', () => {
    let wrapper
    beforeEach(() => {
      wrapper = shallow(<DatasetChecklist />)
    })

    it('should return true when the array contains at least one element', () => {
      const bool = wrapper.instance()._checkArray(['item'])
      expect(bool).toBe(true)
    })

    it('should return false when the array contains no elements', () => {
      const bool = wrapper.instance()._checkArray([])
      expect(bool).toBe(false)
    })

    it('should return false when the array is undefined', () => {
      const bool = wrapper.instance()._checkArray()
      expect(bool).toBe(false)
    })
  })
})
