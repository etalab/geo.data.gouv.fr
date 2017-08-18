import React from 'react'
import { mount } from 'enzyme'

import Loader from 'common/components/Loader'
import LoadableChart from '../LoadableChart'

describe('<LoadableChart />', () => {
  it('should be loading by default', () => {
    const wrapper = mount(<LoadableChart chartType='Line' />)

    expect(wrapper).to.contain(<Loader loading />)
  })
})
