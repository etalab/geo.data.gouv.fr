import React from 'react'
import { shallow } from 'enzyme'

import { CheckDataAvailability } from '../CheckDataAvailability'

const mockTranslation = k => k

describe('<CheckDataAvailability />', () => {
  it('should return true when the array contains at least one element whith available at true', () => {
    const distributions = [{ available: true }, { available: false }]
    const wrapper = shallow(<CheckDataAvailability distributions={distributions} valid t={mockTranslation} />)

    expect(wrapper.html()).to.contain('distributionAvailable')
  })

  it('should return false when the array contains no elements whith available at true', () => {
    const distributions = [{ available: false }, { available: false }]
    const wrapper = shallow(<CheckDataAvailability distributions={distributions} valid={false} t={mockTranslation} />)

    expect(wrapper.html()).to.contain('distributionUnavailable')
  })

  it('should return false when the array is empty', () => {
    const distributions = []
    const wrapper = shallow(<CheckDataAvailability distributions={distributions} valid={false} t={mockTranslation} />)

    expect(wrapper.html()).to.contain('distributionUnavailable')
  })

  it('should return false when the array is undefined', () => {
    const wrapper = shallow(<CheckDataAvailability valid={false} t={mockTranslation} />)

    expect(wrapper.html()).to.contain('distributionUnavailable')
  })
})
