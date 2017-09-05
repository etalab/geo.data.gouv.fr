import React from 'react'
import { shallow } from 'enzyme'

import { CheckLicense } from '../CheckLicense'

const mockTranslation = k => k

describe('<CheckLicense />', () => {
  it('should be true for all accepted licenses', () => {
    const license = 'odbl'
    const wrapper = shallow(<CheckLicense license={license} valid t={mockTranslation} />)

    expect(wrapper.html()).to.contain('validLicense')
  })

  it('should be false for any other licenses and specify the error', () => {
    const license = 'unk-license'
    const wrapper = shallow(<CheckLicense license={license} valid={false} t={mockTranslation} />)

    expect(wrapper.html()).to.contain('unrecognizedLicense')
  })

  it('should be false when license is undefined and specify the error', () => {
    const wrapper = shallow(<CheckLicense valid={false} t={mockTranslation} />)

    expect(wrapper.html()).to.contain('noLicenses')
  })
})
