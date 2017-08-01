import React from 'react'
import { shallow } from 'enzyme'

import DatasetDataAvailability from '../CheckDataAvailability'

describe('<DatasetDataAvailability />', () => {
  it('should return true when the array contains at least one element whith available at true', () => {
    const distributions = [{ available: true }, { available: false }]
    const wrapper = shallow(<DatasetDataAvailability distributions={distributions} valid />)

    expect(wrapper.html()).to.contain('Au moins une des distribution est disponible.')
  })

  it('should return false when the array contains no elements whith available at true', () => {
    const distributions = [{ available: false }, { available: false }]
    const wrapper = shallow(<DatasetDataAvailability distributions={distributions} valid={false} />)

    expect(wrapper.html()).to.contain('Aucune distribution n&#x27;a été trouvée.')
  })

  it('should return false when the array is empty', () => {
    const distributions = []
    const wrapper = shallow(<DatasetDataAvailability distributions={distributions} valid={false} />)

    expect(wrapper.html()).to.contain('Aucune distribution n&#x27;a été trouvée.')
  })

  it('should return false when the array is undefined', () => {
    const wrapper = shallow(<DatasetDataAvailability valid={false} />)

    expect(wrapper.html()).to.contain('Aucune distribution n&#x27;a été trouvée.')
  })
})
