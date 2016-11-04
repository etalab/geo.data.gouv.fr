import React from 'react'
import { shallow } from 'enzyme'
import ContentLoader from '../ContentLoader'
import CircularProgress from '../../CircularProgress/CircularProgress'

describe('<ContentLoader />', () => {
  it('should display a defaut <ContentLoader />', () => {
    const loader = <CircularProgress size={2} />
    const wrapper = shallow(<ContentLoader />)

    expect(wrapper.containsMatchingElement(loader)).toBe(true)
  })

  it('should display a CircularProgress with a size of 3', () => {
    const loader = <CircularProgress size={3} />
    const wrapper = shallow(<ContentLoader size={3} />)

    expect(wrapper.containsMatchingElement(loader)).toBe(true)
  })

  it('should display a CircularProgress with specific style', () => {
    const style = {
      backgroundColor: 'red'
    }
    const loader = <CircularProgress style={style} size={2} />
    const wrapper = shallow(<ContentLoader style={style} />)

    expect(wrapper.contains(loader)).toBe(true)
  })
})
