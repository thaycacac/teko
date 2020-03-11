import React from 'react'
import { ThemeProvider } from 'styled-components'
import { NavigationProvider } from './contexts/navigation'
import { Router } from './Router'
import { theme } from './theme'

const App: React.FunctionComponent = () => {
  return (
    <ThemeProvider theme={theme}>
      <NavigationProvider>
        <Router />
      </NavigationProvider>
    </ThemeProvider>
  )
}

export default App
