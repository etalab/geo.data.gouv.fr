import React from 'react'
import { shallow } from 'enzyme'

import CheckProducers from '../CheckProducers'

describe('<CheckProducers />', () => {
  it('should return true when the array contains at least one element', () => {
    const organizations = ['producteur']
    const wrapper = shallow(<CheckProducers organizations={organizations} valid />)

    expect(wrapper.html()).to.contain('Au moins un producteur est identifié.')
  })

  it('should return false when the array contains no elements', () => {
    const organizations = []
    const wrapper = shallow(<CheckProducers organizations={organizations} valid={false} />)

    expect(wrapper.html()).to.contain('Le producteur n&#x27;a pas été identifié.')
  })

  it('should return false when the array is undefined', () => {
    const organizations = undefined
    const wrapper = shallow(<CheckProducers organizations={organizations} valid={false} />)

    expect(wrapper.html()).to.contain('Le producteur n&#x27;a pas été identifié.')
  })
})
