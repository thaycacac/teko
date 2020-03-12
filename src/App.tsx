import React from 'react'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { NavigationProvider } from './contexts/navigation'
import { Router } from './Router'
import { theme } from './theme'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => props.theme.colors.paleGrey};
  }
  .swiper-container {
    margin-left: auto;
    margin-right: auto;
    position: relative;
    overflow: hidden;
    list-style: none;
    padding: 0;
    z-index: 1;
    background-color: #FFF;
  }
  .swiper-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 1;
    display: flex;
    transition-property: transform;
    box-sizing: content-box;
    background-color: #FFF;
  }
  .swiper-slide {
    flex-shrink: 0;
    width: 100%;
    height: 100%;
    position: relative;
    transition-property: transform;
  }
  .swiper-pagination {
    position: absolute;
    text-align: center;
    transform: translate3d(0, 0, 0);
    z-index: 10;
  }
  .swiper-pagination-bullet {
    width: 8px;
    height: 8px;
    display: inline-block;
    border-radius: 100%;
    background: ${props => props.theme.colors.paleGrey};
  }
  .swiper-container-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet {
    margin: 0 4px;
  }
  .swiper-container-horizontal > .swiper-pagination-bullets {
    bottom: 10px;
    left: 0;
    width: 100%;
  }
  .swiper-pagination-bullet-active {
    background: ${props => props.theme.colors.reddishOrange};
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
