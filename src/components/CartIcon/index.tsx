import React from 'react'
import styled from 'styled-components'

const BackIconWrapper = styled.button`
  width: 24pt;
  height: 24pt;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: transparent;
`

export const CartIcon: React.FunctionComponent = () => (
  <BackIconWrapper>
    <img src="/public/images/CartOutlined.png" srcSet="/public/images/CartOutlined@2x.png 2x, /public/images/CartOutlined@3x.png 3x" />
  </BackIconWrapper>
)
