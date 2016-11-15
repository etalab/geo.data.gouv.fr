import React from 'react'
import { shallow } from 'enzyme'
import DatasetChecklist, { _checkArray } from '../DatasetChecklist'
import CheckItem from '../../CheckItem/CheckItem'

describe('<DatasetChecklist />', () => {

  describe('checkLicense()', () => {
    it('should be true for odbl license', () => {
      const dataset = {license: 'odbl'}
      const wrapper = shallow(<DatasetChecklist dataset={dataset} />)

      const valid = wrapper.instance().checkLicense()

      expect(valid).toEqual(<CheckItem name={'Licence'} valid={true} />)
    })

    it('should be true for fr-lo license', () => {
      const dataset = {license: 'fr-lo'}
      const wrapper = shallow(<DatasetChecklist dataset={dataset} />)

      const valid = wrapper.instance().checkLicense()

      expect(valid).toEqual(<CheckItem name={'Licence'} valid={true} />)
    })

    it('should be false for any other licenses and specify the error', () => {
      const dataset = {license: 'unk-license'}
      const wrapper = shallow(<DatasetChecklist dataset={dataset} />)

      const valid = wrapper.instance().checkLicense()

      expect(valid).toEqual(<CheckItem name={'Licence'} valid={false} msg={'La licence unk-license n\'est pas reconnue.'} />)
    })

    it('should be false when license is undefined and specify the error', () => {
      const dataset = {license: undefined}
      const wrapper = shallow(<DatasetChecklist dataset={dataset} />)

      const valid = wrapper.instance().checkLicense()

      expect(valid).toEqual(<CheckItem name={'Licence'} valid={false} msg={'Aucune licence n\'a pu être trouvée.'} />)
    })
  })
})

describe('_checkArray()', () => {
  it('should return true when the array contains at least one element', () => {
    const bool = _checkArray(['item'])
    expect(bool).toBe(true)
  })

  it('should return false when the array contains no elements', () => {
    const bool = _checkArray([])
    expect(bool).toBe(false)
  })

  it('should return false when the array is undefined', () => {
    const bool = _checkArray()
    expect(bool).toBe(false)
  })
})
