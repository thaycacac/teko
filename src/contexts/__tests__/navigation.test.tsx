import { navigationReducer, State, Action } from '../navigation'

const initialState: State = {
  stack: [{
    name: 'PRODUCT_LISTING',
  }]
}
describe('navigationReducer', () => {
  test('dispatch PUSH to navigationReducer', () => {
    const pushAction: Action = {
      type: 'PUSH',
      payload: {
        name: 'PRODUCT_DETAIL',
        payload: {
          sku: '1020020',
        },
      },
    }
    const newState = navigationReducer(initialState, pushAction)
    expect(newState).toEqual({
      stack: [{
        name: 'PRODUCT_LISTING',
      }, {
        name: 'PRODUCT_DETAIL',
        payload: {
          sku: '1020020',
        },
      }]
    })
  })

  test('dispatch POP to navigationReducer', () => {
    const pushAction: Action = {
      type: 'POP',
    }
    const newState = navigationReducer(initialState, pushAction)
    expect(newState).toEqual({
      stack: [{
        name: 'PRODUCT_LISTING',
      }]
    })
  })
})
