import React from 'react'
import { ThemeProvider, DefaultTheme } from 'styled-components'
import { NavigationProvider } from './contexts/navigation'
import { Router } from './Router'

const theme: DefaultTheme = {
  colors: {
    reddishOrange: '#f5471e',
    coolGrey: '#8f9598',
    silver: '#c6cace',
    tomato: '#ea341f',
    darkGrey: '#262829',
    paleGrey: '#eef1f3',
    white: '#FFF',
    black30: 'rgba(0, 0, 0, .3)',
    pumpkinOrange: '#f58400',
    deepSkyBlue: '#1e75f6',
  }
}

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
