import React from 'react'
import { mount } from 'enzyme'

import Loader from 'common/components/Loader'
import LoadableCenteredMap from '../LoadableCenteredMap'

describe('<LoadableCenteredMap />', () => {
  it('should be loading by default', () => {
    const wrapper = mount(<LoadableCenteredMap vectors={{}} />)

    expect(wrapper).to.contain(<Loader loading />)
  })
})
