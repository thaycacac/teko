import React, { useCallback } from 'react'
import styled from 'styled-components'
import { Stepper } from '../Stepper'
import { AddToCartButton } from '../AddToCartButton'
import { CartState, useCartDispatch } from '../../contexts/cart'
import { Product } from '../../repositories/products'

interface AddToCartBarProps {
  cartState: CartState;
  product: Product;
}

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 8pt;
  background-color: ${props => props.theme.colors.white};
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const AddToCartBar: React.FunctionComponent<AddToCartBarProps> = ({ cartState, product }: AddToCartBarProps) => {
  const dispatch = useCartDispatch()
  const handleAddToCart = useCallback(() => {
    if (cartState.totalItems > 0) {
      console.log('Go to shopping cart')
    } else {
      dispatch({
        type: 'ADD',
        payload: product,
      })
    }
  }, [cartState, product])
  const currentCart = cartState.cart[product.sku]
  return (
    <Container>
      {currentCart && (
        <Stepper
        />
      )}
      <AddToCartButton
        cartState={cartState}
        onClick={handleAddToCart}
      />
    </Container>
  )
}
