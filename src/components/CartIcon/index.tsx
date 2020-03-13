import React from 'react'
import styled from 'styled-components'

interface CartIconProps {
  totalItems: number;
}
const BackIconWrapper = styled.button`
  width: 24pt;
  height: 24pt;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: transparent;
  position: relative;
`

const Amount = styled.span`
  background-color: ${props => props.theme.colors.pumpkinOrange};
  color:${props => props.theme.colors.white};
  min-width: 13pt;
  height: 13pt;
  border-radius: 50%;
  position: absolute;
  top: -5pt;
  right: -5pt;
  font-size: 10pt;

`

export const CartIcon: React.FunctionComponent<CartIconProps> = ({ totalItems }: CartIconProps) => (
  <BackIconWrapper>
    <img src="/public/images/CartOutlined.png" srcSet="/public/images/CartOutlined@2x.png 2x, /public/images/CartOutlined@3x.png 3x" />
    {(totalItems > 0) && (
      <Amount>{totalItems}</Amount>
    )}
  </BackIconWrapper>
)
