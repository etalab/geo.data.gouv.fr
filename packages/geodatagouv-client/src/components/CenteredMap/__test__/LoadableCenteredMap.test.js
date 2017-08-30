import React from 'react'
import { shallow } from 'enzyme'

import Loader from 'common/components/Loader'
import LoadableCenteredMap from '../LoadableCenteredMap'

describe('<LoadableCenteredMap />', () => {
  it('should be loading by default', () => {
    const wrapper = shallow(<LoadableCenteredMap vectors={{}} />)

    expect(wrapper).to.containMatchingElement(<Loader isLoading pastDelay={false} />)
  })
})
