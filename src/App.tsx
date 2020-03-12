import React from 'react'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { NavigationProvider } from './contexts/navigation'
import { Router } from './Router'
import { theme } from './theme'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => props.theme.colors.paleGrey};
  }
`

const App: React.FunctionComponent = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <NavigationProvider>
        <Router />
      </NavigationProvider>
    </ThemeProvider>
  )
}

export default App
