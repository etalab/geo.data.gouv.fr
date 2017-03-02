import React from 'react'
import { shallow } from 'enzyme'

import { ACCEPTED_LICENSES } from '../../../../../helpers/dataGouvChecks'
import CheckLicense from '../CheckLicense'

describe('<CheckLicense />', () => {
  it('should be true for all accepted licenses', () => {
    const license = ACCEPTED_LICENSES[0]
    const wrapper = shallow(<CheckLicense license={license} valid={true} />)

    expect(wrapper.html()).to.contain(`La licence ${license} est valide.`)
  })

  it('should be false for any other licenses and specify the error', () => {
    const license = 'unk-license'
    const wrapper = shallow(<CheckLicense license={license} valid={false}/>)

    expect(wrapper.html()).to.contain('La licence unk-license n&#x27;est pas reconnue.')
  })

  it('should be false when license is undefined and specify the error', () => {
    const wrapper = shallow(<CheckLicense valid={false}/>)

    expect(wrapper.html()).to.contain('Aucune licence n&#x27;a pu être trouvée.')
  })
})
