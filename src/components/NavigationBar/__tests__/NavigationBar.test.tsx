import React from 'react'
import renderer from 'react-test-renderer'
import { ThemeProvider } from 'styled-components'
import { render } from '@testing-library/react'
import { NavigationBar } from '..'
import { theme } from '../../../theme'

jest.mock('../../../contexts/navigation', () => ({
  useNavigationDispatch: jest.fn(() => null)
}))

describe('NavigationBar', () => {
  test('NavigationBar renders correctly', () => {
    const tree = renderer.create(
      <ThemeProvider theme={theme}>
        <NavigationBar>
          Children
        </NavigationBar>
      </ThemeProvider>
    )
    expect(tree).toMatchSnapshot()
  })

  test('NavigationBar with primary variant', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <NavigationBar variant="primary">
          Children
        </NavigationBar>
      </ThemeProvider>
    )
    expect(container.querySelector('img')).toHaveAttribute('src', '/public/images/ArrowBackWhite.png')
  })

  test('NavigationBar with primary secondary', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <NavigationBar variant="secondary">
          Children
        </NavigationBar>
      </ThemeProvider>
    )
    expect(container.querySelector('img')).toHaveAttribute('src', '/public/images/ArrowBackBlack.png')
  })
})
