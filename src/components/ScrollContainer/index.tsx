import React, { useRef, useCallback } from 'react'
import styled from 'styled-components'
import { useElementScroll } from '../../hooks/use-element-scroll'

interface ScrollContainerProps {
  children: React.ReactNode;
  isFetching: boolean;
  onLoadMore: () => void;
}

const Wrapper = styled.div`
  overflow-y: auto;
  height: calc(100% - 44pt);
`

export const ScrollContainer: React.FunctionComponent<ScrollContainerProps> = ({ children, isFetching, onLoadMore }: ScrollContainerProps) => {
  const containerEl = useRef(null)
  useElementScroll(containerEl, useCallback((e: any) => {
    if (!isFetching && e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight) {
      onLoadMore()
    }
  }, [containerEl]))
  return (
    <Wrapper ref={containerEl}>
      {children}
      {isFetching && <p>Fetching</p>}
    </Wrapper>
  )
}
