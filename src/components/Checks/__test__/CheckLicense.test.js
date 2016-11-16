import React from 'react'
import { shallow } from 'enzyme'
import CheckLicense, { ACCEPTED_LICENSES } from '../CheckLicense'

describe('<CheckLicense />', () => {
  describe('check()', () => {
    it('should be true for all accepted licenses', () => {
      ACCEPTED_LICENSES.map(license => {
        const wrapper = shallow(<CheckLicense license={license} />)
        const check = wrapper.instance().check()

        return expect(check).toEqual({msg: `La licence ${license} est valide.`, valid: true})
      })
    })

    it('should be false for any other licenses and specify the error', () => {
      const license = 'unk-license'
      const wrapper = shallow(<CheckLicense license={license} />)

      const check = wrapper.instance().check()

      expect(check).toEqual({msg: 'La licence unk-license n\'est pas reconnue.', valid: false})
    })

    it('should be false when license is undefined and specify the error', () => {
      const wrapper = shallow(<CheckLicense />)

      const check = wrapper.instance().check()

      expect(check).toEqual({msg: 'Aucune licence n\'a pu être trouvée.', valid: false})
    })
  })
})
