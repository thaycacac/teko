import React from 'react'
import renderer from 'react-test-renderer'
import { ThemeProvider } from 'styled-components'
import { CartIcon } from '..'
import { theme } from '../../../theme'

describe('CartIcon', () => {
  test('CartIcon renders correctly', () => {
    const tree = renderer.create(
      <ThemeProvider theme={theme}>
        <CartIcon totalItems={1} />
      </ThemeProvider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
