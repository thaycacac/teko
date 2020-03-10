import React from 'react'
import renderer from 'react-test-renderer'
import { CartIcon } from '..'

describe('CartIcon', () => {
  test('CartIcon renders correctly', () => {
    const tree = renderer.create(<CartIcon />).toJSON();
    expect(tree).toMatchSnapshot();
  })
})
