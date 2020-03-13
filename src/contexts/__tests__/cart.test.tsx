import { cartReducer, State, Action } from '../cart'
import { Product } from '../../repositories/products'

const product: Product = {
  displayName: 'Máy tính để bàn - PC Acer AS XC-885 (i5-8400/4GB/1TB HDD/UHD 630/Endless)',
  sku: '1807564',
  images: [{
    url: 'https://phongvu.vn/media/catalog_v2/media/48/18/1570775921.343882_Acer_AS_XC-885_1.jpg',
    priority: 1,
  }],
  status: {
    publish: true,
    sale: 'ngung_kinh_doanh' as const,
  },
  promotionPrices: [{
    channel: 'pv_online',
    terminal: 'phongvu',
    finalPrice: 11890000,
    bestPrice: 11890000,
  }],
  price: {
    supplierSalePrice: 11890000,
    sellPrice: 11890000,
  },
  saleCategories: [],
  attributeGroups: [],
  attributes: [],
}

const initialState: State = {
  cart: {}
}

describe('cartReducer', () => {
  test('dispatch ADD to cartReducer', () => {
    const pushAction: Action = {
      type: 'ADD',
      payload: product,
    }
    const newState = cartReducer(initialState, pushAction)
    expect(newState).toEqual({
      cart: {
        1807564: {
          quantity: 1,
          price: 11890000,
        },
      },
    })

    const newNextState = cartReducer(newState, pushAction)
    expect(newNextState).toEqual({
      cart: {
        1807564: {
          quantity: 2,
          price: 11890000,
        },
      },
    })
  })
  test('dispatch DELETE to cartReducer', () => {
    const deleteAction: Action = {
      type: 'DELETE',
      payload: product,
    }
    const state = {
      cart: {
        1807564: {
          quantity: 2,
          price: 11890000,
        },
      },
    }
    const newState = cartReducer(state, deleteAction)
    expect(newState).toEqual({
      cart: {
        1807564: {
          quantity: 1,
          price: 11890000,
        },
      },
    })

    const newNextState = cartReducer(newState, deleteAction)
    expect(newNextState).toEqual({
      cart: {},
    })
  })
})
