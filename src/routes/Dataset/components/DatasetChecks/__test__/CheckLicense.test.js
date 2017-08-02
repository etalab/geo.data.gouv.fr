import React from 'react'
import { shallow } from 'enzyme'

import CheckLicense from '../CheckLicense'

describe('<CheckLicense />', () => {
  it('should be true for all accepted licenses', () => {
    const license = 'odbl'
    const wrapper = shallow(<CheckLicense license={license} valid />)

    expect(wrapper.html()).to.contain('La licence Open Database License (ODbL 1.0) est valide.')
  })

  it('should be false for any other licenses and specify the error', () => {
    const license = 'unk-license'
    const wrapper = shallow(<CheckLicense license={license} valid={false} />)

    expect(wrapper.html()).to.contain('La licence unk-license n’est pas reconnue.')
  })

  it('should be false when license is undefined and specify the error', () => {
    const wrapper = shallow(<CheckLicense valid={false} />)

    expect(wrapper.html()).to.contain('Aucune licence n’a pu être trouvée.')
  })
})
