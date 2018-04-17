import React from 'react'
import renderer from 'react-test-renderer'

import Warning from '../../components/warning'

describe('<Warning />', () => {
  test('render correctly', () => {
    const tree = renderer
      .create(
        <Warning>
          Some content
        </Warning>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
