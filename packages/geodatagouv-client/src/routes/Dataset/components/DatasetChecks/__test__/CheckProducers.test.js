import React from 'react'
import { shallow } from 'enzyme'

import { CheckProducers } from '../CheckProducers'

const translateMock = k => k

describe('<CheckProducers />', () => {
  it('should return true when the array contains at least one element', () => {
    const organizations = ['producteur']
    const wrapper = shallow(<CheckProducers organizations={organizations} valid t={translateMock} />)

    expect(wrapper.html()).to.contain('identifiedProducer')
  })

  it('should return false when the array contains no elements', () => {
    const organizations = []
    const wrapper = shallow(<CheckProducers organizations={organizations} valid={false} t={translateMock} />)

    expect(wrapper.html()).to.contain('unindentifiedProducer')
  })

  it('should return false when the array is undefined', () => {
    const organizations = undefined
    const wrapper = shallow(<CheckProducers organizations={organizations} valid={false} t={translateMock} />)

    expect(wrapper.html()).to.contain('unindentifiedProducer')
  })
})
