import React from 'react'
import { shallow } from 'enzyme'
import CheckLicense, { ACCEPTED_LICENSES } from '../CheckLicense'

describe('<CheckLicense />', () => {
  describe('check()', () => {
    it('should be true for all accepted licenses', () => {
      ACCEPTED_LICENSES.map(license => {
        const wrapper = shallow(<CheckLicense license={license} />)
        const check = wrapper.instance().check()

        expect(check.msg).to.equal(`La licence ${license} est valide.`)
        expect(check.valid).to.be.true
        expect(check.content).to.equal(undefined)
        return true
      })
    })

    it('should be false for any other licenses and specify the error', () => {
      const license = 'unk-license'
      const wrapper = shallow(<CheckLicense license={license} />)

      const check = wrapper.instance().check()

      expect(check.msg).to.equal('La licence unk-license n\'est pas reconnue.')
      expect(check.valid).to.equal(false)
      expect(check.content).to.exist
    })

    it('should be false when license is undefined and specify the error', () => {
      const wrapper = shallow(<CheckLicense />)

      const check = wrapper.instance().check()

      expect(check.msg).to.equal('Aucune licence n\'a pu être trouvée.')
      expect(check.valid).to.equal(false)
      expect(check.content).to.exist
    })
  })
})
