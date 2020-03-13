import React from 'react'
import renderer from 'react-test-renderer'
import { ThemeProvider } from 'styled-components'
import { render } from '@testing-library/react'
import { AddToCartButton } from '..'
import { theme } from '../../../theme'

const props = {
  cartState: {
    cart: {},
    totalItems: 0,
    totalValue: 0,
  },
  onClick: () => null,
}
describe('AddToCartButton', () => {
  test('AddToCartButton renders correctly', () => {
    const tree = renderer.create(
      <ThemeProvider theme={theme}>
        <AddToCartButton {...props} />
      </ThemeProvider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('AddToCartButton displays Add To Cart text when totalValue === 0', () => {
    const testProps = props
    const { container } = render(
      <ThemeProvider theme={theme}>
        <AddToCartButton {...testProps} />
      </ThemeProvider>
    )
    expect(container.querySelector('span')).toHaveTextContent('Add To Cart')
  })

  test('AddToCartButton displays cart value when totalValue > 0', () => {
    const testProps = {
      ...props,
      cartState: Object.assign({}, props.cartState, {
        totalValue: 1000,
      })
    }
    const { container } = render(
      <ThemeProvider theme={theme}>
        <AddToCartButton {...testProps} />
      </ThemeProvider>
    )
    expect(container.querySelector('span')).toHaveTextContent('1.000đ')
  })
})
