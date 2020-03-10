import React from 'react'
import { useTransition, animated } from 'react-spring'
import styled from 'styled-components'
import { ProductListing } from './containers/ProductListing'
import { ProductDetail } from './containers/ProductDetail'
import { ScreenPayload } from './types'
import { useNavigationState, ScreenPayloadWithOrder } from './contexts/navigation'
import { useWindowSize } from './hooks/use-window-size'

const Wrapper = styled.div`
  overflow: hidden;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
`
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
  const { currentScreen, stackWithOrder } = useNavigationState()
  const { width } = useWindowSize()
  if (!currentScreen) {
    throw Error('Programming error: There is no current screen to render')
  }
  const transitions = useTransition<ScreenPayloadWithOrder | undefined, object>(stackWithOrder, item => `stack-${item && item.order}`, {
    reset: false,
    config: {
      precision: 1,
    },
    from: (item: ScreenPayloadWithOrder) => ({
      position: 'absolute',
      top: 0,
      bottom: 0,
      width,
      left: stackWithOrder.length > 1 ? item.order === 0 ? -width : width : 0
    }),
    enter: { left: 0 },
    leave: (item: ScreenPayloadWithOrder) => ({
      left: item.order >= stackWithOrder.length ? width : -width
    }),
  })
  return (
    <Wrapper>
      {transitions.map(({ item, key, props }) => (
        item && <animated.div key={key} style={props}>
          {renderScreen(item)}
        </animated.div>
      ))}
    </Wrapper>
  )
}
