import React from 'react'
import styled from 'styled-components'
import { useNavigationDispatch } from '../../contexts/navigation'

interface ContainerProps {
  variant: 'primary' | 'secondary';
}
const Container = styled.div<ContainerProps>`
  height: 44pt;
  ${props => {
    switch (props.variant) {
      case 'primary':
        return `
          background: rgb(232,32,32);
          background: linear-gradient(90deg, rgba(232,32,32,1) 0%, ${props.theme.colors.reddishOrange} 100%);
        `
      case 'secondary':
        return `
          background: ${props.theme.colors.white};
        `
    }
  }}
  border-bottom: 1px solid ${props => props.theme.colors.paleGrey};
  padding: 8pt 11pt;
  display: flex;
  align-items: center;
`
const BackIconWrapper = styled.button`
  width: 24pt;
  height: 24pt;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 11pt;
  border: none;
  background-color: transparent;
`

interface NavigationBarProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  rightNode?: React.ReactNode;
}

export const NavigationBar: React.FunctionComponent<NavigationBarProps> = ({ children, variant, rightNode }: NavigationBarProps) => {
  const dispatch = useNavigationDispatch()
  let arrowBackImage = ''
  switch (variant) {
    case 'primary':
      arrowBackImage = 'ArrowBackWhite'
      break
    case 'secondary':
      arrowBackImage = 'ArrowBackBlack'
      break
  }
  return (
    <Container variant={variant!}>
      <BackIconWrapper onClick={() => dispatch({ type: 'POP' })}>
        <img src={`/public/images/${arrowBackImage}.png`} srcSet={`/public/images/${arrowBackImage}@2x.png 2x, /public/images/${arrowBackImage}@3x.png 3x`} />
      </BackIconWrapper>
      {children}
      {rightNode}
    </Container>
  )
}

NavigationBar.defaultProps = {
  variant: 'primary'
}
