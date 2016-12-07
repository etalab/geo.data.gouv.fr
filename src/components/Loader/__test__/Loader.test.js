import React, { Component } from 'react'
import { shallow } from 'enzyme'
import Loader from '../Loader'
import CircularProgress from '../../CircularProgress/CircularProgress'

describe('Loader', () => {
  it('should display a loader when value is undefined', () => {
    const loader =  <CircularProgress size={1} />
    const wrapper = shallow(<Loader value={undefined} component={<Component />} />)

    expect(wrapper.contains(loader)).to.be.true
  })

  it('should display a component when value is defined', () => {
    const component =  <Component />
    const wrapper = shallow(<Loader value={1} component={component} />)
    expect(wrapper.contains(component)).to.be.true
  })
})
