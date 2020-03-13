import React from 'react'
import renderer from 'react-test-renderer'
import { ThemeProvider } from 'styled-components'
import { ProductDetail } from '..'
import { theme } from '../../../theme'
import { NavigationProvider } from '../../../contexts/navigation'

describe('SimilarProducts', () => {
  test('SimilarProducts renders correctly', () => {
    const tree = renderer.create(
      <ThemeProvider theme={theme}>
        <NavigationProvider>
          <ProductDetail sku="102034" />
        </NavigationProvider>
      </ThemeProvider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
