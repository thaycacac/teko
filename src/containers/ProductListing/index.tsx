import React, { useCallback, useEffect, useState, ChangeEvent } from 'react'
import styled from 'styled-components'
import debounce from 'lodash.debounce'
import { search, ProductSearchParams, Product } from '../../repositories/products'
import { NavigationBar } from '../../components/NavigationBar'
import { ScrollContainer } from '../../components/ScrollContainer'
import { useNavigationDispatch } from '../../contexts/navigation'
import ProductRow from '../../components/ProductRow'

const InputWrapper = styled.div`
  flex: 1;
  background-color: ${props => props.theme.colors.white};
  border-radius: 8pt;
  height: 32pt;
  box-shadow: 0 2pt 4pt 0 ${props => props.theme.colors.black30};
  display: flex;
  align-items: center;
  padding: 0 8pt;
`

const Input = styled.input`
  border: 0;
  width: 100%;
  height: 100%;
  border-radius: 8pt;
  &:focus {
    outline: none;
  }
`

const SearchIconWrapper = styled.div`
  margin-right: 2pt;
`
export const ProductListing: React.FunctionComponent = () => {
  const dispatch = useNavigationDispatch()
  const [query, setQuery] = useState<ProductSearchParams>({
    _page: 1,
    q: '',
  })

  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [displayedProducts, setDisplayedProducts] = useState<Array<Product>>([])
  const loadData = useCallback(async () => {
    setIsFetching(true)
    const { result } = await search(query)
    setDisplayedProducts(query._page === 1 ? result.products : displayedProducts.concat(result.products))
    setIsFetching(false)
  }, [query])

  const updateKeyword = useCallback(debounce((keyword: string) => {
    setQuery(prevState => {
      return {
        _page: prevState.q !== keyword ? 1 : prevState._page,
        q: keyword,
      }
    })
  }, 500), [])

  useEffect(() => {
    loadData()
  }, [loadData, query])

  return (
    <>
      <NavigationBar>
        <InputWrapper>
          <SearchIconWrapper>
            <img src="/public/images/Search.png" srcSet="/public/images/Search@2x.png 2x, /public/images/Search@3x.png 3x" />
          </SearchIconWrapper>
          <Input
            placeholder="Nhập tên, mã sản phẩm"
            onChange={(e: ChangeEvent<HTMLInputElement>): void => {
              updateKeyword(e.target.value)
            }}
          />
        </InputWrapper>
      </NavigationBar>
      <ScrollContainer
        isFetching={isFetching}
        onLoadMore={(): void => {
          setQuery(prevState => ({
            ...prevState,
            _page: prevState._page + 1,
          }))
        }}
      >
        {displayedProducts.map(product => (
          <ProductRow
            key={product.sku}
            onClick={
              (): void => dispatch({
                type: 'PUSH',
                payload: {
                  name: 'PRODUCT_DETAIL',
                  payload: {
                    sku: product.sku,
                  }
                }
              })}
            product={product}
          />
        ))}
      </ScrollContainer>
    </>
  )
}


export default ProductListing
