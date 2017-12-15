import React from 'react'
import renderer from 'react-test-renderer'

import Info from '../../components/info'

describe('<Info />', () => {
  test('render correctly', () => {
    const tree = renderer
      .create(
        <Info>
          Some content
        </Info>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
