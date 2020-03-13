import React, { useReducer, useContext, useMemo } from 'react'
import { Product } from '../repositories/products'

export interface CartProviderProps {
  children: React.ReactNode;
}

export interface Cart {
  [key: string]: {
    quantity: number;
    price: number;
  };
}

export interface State {
  cart: Cart;
}

export type Action =
  | { type: 'ADD'; payload: Product }
  | { type: 'DELETE'; payload: Product };

type Dispatch = (action: Action) => void

const initialState: State = {
  cart: {}
}

export type CartState = State & {
  totalItems: number;
  totalValue: number;
}

const CartStateContext = React.createContext<CartState>(initialState as CartState)
const CartDispatchContext = React.createContext<Dispatch | undefined>(undefined)

export function cartReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD': {
      const product = action.payload
      return {
        ...state,
        cart: Object.assign({}, state.cart, {
          [product.sku]: {
            price: product.price.sellPrice,
            quantity: state.cart[product.sku] ? state.cart[product.sku].quantity + 1 : 1,
          }
        })
      }
    }
    case 'DELETE': {
      const product = action.payload
      if (!state.cart[product.sku]) {
        return state
      }
      if (state.cart[product.sku].quantity > 1) {
        return {
          ...state,
          cart: Object.assign({}, state.cart, {
            [product.sku]: {
              price: product.price.sellPrice,
              quantity: state.cart[product.sku].quantity - 1,
            }
          })
        }
      }
      const { [product.sku]: value, ...cart } = state.cart
      return {
        ...state,
        cart,
      }
    }
    default:
      throw new Error()
  }
}

export function CartProvider({ children }: CartProviderProps): React.ReactNode {
  const [state, dispatch] = useReducer(cartReducer, initialState)
  const cartState: CartState = useMemo(() => {
    let totalItems = 0
    let totalValue = 0
    Object.keys(state.cart).forEach(productSku => {
      totalItems += state.cart[productSku].quantity
      totalValue += state.cart[productSku].quantity * state.cart[productSku].price
    })
    return {
      cart: state.cart,
      totalItems,
      totalValue,
    }
  }, [state])
  return (
    <CartStateContext.Provider value={cartState}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  )
}

export function useCartState(): CartState {
  const context = useContext(CartStateContext)
  if (!context) {
    throw new Error('useCartState must be inside a CartProvider with a state value')
  }
  return context
}

export function useCartDispatch(): Dispatch {
  const context = useContext(CartDispatchContext)
  if (!context) {
    throw new Error('useCartDispatch must be inside a CartProvider with a state dispatch')
  }
  return context
}
