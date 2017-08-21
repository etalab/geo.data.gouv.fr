import React from 'react'
import { shallow } from 'enzyme'

import Loader from 'common/components/Loader'
import LoadableChart from '../LoadableChart'

describe('<LoadableChart />', () => {
  it('should be loading by default', () => {
    const wrapper = shallow(<LoadableChart chartType='Line' data={{}} />)

    expect(wrapper).to.containMatchingElement(<Loader isLoading pastDelay={false} />)
  })
})
