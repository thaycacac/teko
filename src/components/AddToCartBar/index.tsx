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
  const increateQuantity = useCallback(() => (
    dispatch({
      type: 'ADD',
      payload: product,
    })
  ), [product])
  const decreaseQuantity = useCallback(() => (
    dispatch({
      type: 'DELETE',
      payload: product,
    })
  ), [product])
  const currentCart = cartState.cart[product.sku]
  const handleAddToCart = useCallback(() => {
    if (currentCart && cartState.totalItems > 0) {
      alert('Go to shopping cart')
    } else {
      increateQuantity()
    }
  }, [cartState, product])
  return (
    <Container>
      {currentCart && (
        <Stepper
          increase={increateQuantity}
          value={currentCart.quantity}
          decrease={decreaseQuantity}
        />
      )}
      <AddToCartButton
        cartState={cartState}
        onClick={handleAddToCart}
      />
    </Container>
  )
}
