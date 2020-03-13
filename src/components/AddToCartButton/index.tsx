import React from 'react'
import styled from 'styled-components'
import { CartState } from '../../contexts/cart'
import { thoundsandDelimiter } from '../../helpers/number'
import { Sup } from '../Styled/Sup'

interface AddToCartButtonProps {
  cartState: CartState;
  onClick: () => void;
}

const Button = styled.button`
  border: 0;
  display: flex;
  margin-left: auto;
  align-items: center;
  background: rgb(232,32,32);
  background: linear-gradient(90deg, rgba(232,32,32,1) 0%, ${props => props.theme.colors.reddishOrange} 100%);
  border-radius: 8pt;
  color: ${props => props.theme.colors.white};
  padding: 8pt;
  max-width: 250pt;
  justify-content: space-between;
  span {
    margin-left: 50pt;
    font-size: 15pt;
  }
`

export const AddToCartButton: React.FunctionComponent<AddToCartButtonProps> = ({ cartState, onClick }: AddToCartButtonProps) => {
  return (
    <Button onClick={onClick}>
      <img src="/public/images/AddToCart.png" srcSet="/public/images/AddToCart@2x.png 2x, /public/images/AddToCart@3x.png 3x" />
      {cartState.totalValue > 0 ? (
        <span>{thoundsandDelimiter(cartState.totalValue)}<Sup>đ</Sup></span>
      ) : (
        <span>Add To Cart</span>
      )}
    </Button>
  )
}
