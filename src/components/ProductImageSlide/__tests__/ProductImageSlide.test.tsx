import React from 'react'
import renderer from 'react-test-renderer'
import { ThemeProvider } from 'styled-components'
import { render } from '@testing-library/react'
import { ProductImageSlide } from '..'
import { theme } from '../../../theme'

const props = {
  image: {
    url: 'https://devdocs.magento.com/assets/i/magento-logo.svg',
    priority: 1,
  },
}

describe('ProductImageSlide', () => {
  test('ProductImageSlide renders correctly', () => {
    const tree = renderer.create(
      <ThemeProvider theme={theme}>
        <ProductImageSlide {...props} />
      </ThemeProvider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('AddToCartButton displays Add To Cart text when totalValue === 0', () => {
    const testProps = props
    const { container } = render(
      <ThemeProvider theme={theme}>
        <ProductImageSlide {...testProps} />
      </ThemeProvider>
    )
    expect(container.querySelector('img')).toHaveAttribute('src', props.image.url)
  })
})
