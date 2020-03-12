import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { search, ProductSearchParams, Product } from '../../repositories/products'
import { NavigationBar } from '../../components/NavigationBar'
import { useNavigationDispatch } from '../../contexts/navigation'
import ProductRow from '../../components/ProductRow'

const ScrollWrapper = styled.div`
  overflow-y: auto;
  height: calc(100% - 44pt);
`
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
  const [page, setPage] = useState<number>(1)
  const [displayedProducts, setDisplayedProducts] = useState<Array<Product>>([])

  const loadData = useCallback(async () => {
    const { result } = await search({ page } as ProductSearchParams)
    setDisplayedProducts(displayedProducts.concat(result.products))
  }, [page])

  useEffect(() => {
    loadData()
  }, [loadData, page])
  return (
    <>
      <NavigationBar>
        <InputWrapper>
          <SearchIconWrapper>
            <img src="/public/images/Search.png" srcSet="/public/images/Search@2x.png 2x, /public/images/Search@3x.png 3x" />
          </SearchIconWrapper>
          <Input placeholder="Nhập tên, mã sản phẩm" />
        </InputWrapper>
      </NavigationBar>
      <ScrollWrapper>
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
      </ScrollWrapper>
    </>
  )
}


