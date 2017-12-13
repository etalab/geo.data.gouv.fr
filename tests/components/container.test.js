import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import Container from '../../components/container'

describe('<Container />', () => {
  test('should set maxWidth when not fluid', () => {
    const element = shallow(<Container />).getElement()

    expect(element.props.style.maxWidth).toBe(1200)
  })

  test('should not set maxWidth when fluid', () => {
    const element = shallow(<Container fluid />).getElement()

    expect(element.props.style.maxWidth).toBe(null)
  })

  test('renders correctly', () => {
    const tree = renderer
      .create(
        <Container>
          Some content
        </Container>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
