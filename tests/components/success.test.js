import React from 'react'
import renderer from 'react-test-renderer'

import Success from '../../components/success'

describe('<Success />', () => {
  test('renders correctly', () => {
    const tree = renderer
      .create(
        <Success>
          Some content
        </Success>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
