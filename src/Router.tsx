import React from 'react'
import { ProductListing } from './containers/ProductListing'
import { ProductDetail } from './containers/ProductDetail'
import { ScreenPayload } from './types'
import { useNavigationState } from './contexts/navigation'

function renderScreen(screen: ScreenPayload): React.ReactNode {
  switch (screen.name) {
    case 'PRODUCT_LISTING':
      return <ProductListing />
    case 'PRODUCT_DETAIL':
      return <ProductDetail />
    default:
      return null
  }
}

export const Router: React.FunctionComponent = () => {
  const { currentScreen } = useNavigationState()
  if (!currentScreen) {
    throw Error('Programming error: There is no current screen to render')
  }
  return (
    <>
      {renderScreen(currentScreen)}
    </>
  )
}
