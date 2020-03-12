import { thoundsandDelimiter } from '../number'

describe('Number helpers: thoundsandDelimiter', () => {
  test('thoundsandDelimiter with null should return a formatted number ', () => {
    const output = thoundsandDelimiter(19002030)
    expect(output).toEqual('19.002.030')
  })
})
