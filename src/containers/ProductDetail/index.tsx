import React, { useEffect, useCallback, useState } from 'react'
import styled from 'styled-components'
import { get, Product } from '../../repositories/products'
import { NavigationBar } from '../../components/NavigationBar'
import { CartIcon } from '../../components/CartIcon'
import { ProductNavigationTitle } from '../../components/ProductNavigationTitle'
interface ProductDetailProps {
  sku: string;
}

const Wrapper = styled.div`
  overflow-y: auto;
  height: calc(100% - 44pt);
  background-color: ${props => props.theme.colors.paleGrey};
`

export const ProductDetail: React.FunctionComponent<ProductDetailProps> = ({ sku }: ProductDetailProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [product, setProduct] = useState<Product | undefined>()
  const fetchProduct = useCallback(async () => {
    setIsLoading(true)
    const data = await get(sku)
    setProduct(data)
    setIsLoading(false)
  }, [sku])

  useEffect(() => {
    fetchProduct()
  }, [sku])
  return (
    <>
      <NavigationBar
        variant="secondary"
        rightNode={<CartIcon />}
      >
        {product && (
          <ProductNavigationTitle product={product} />
        )}
      </NavigationBar>
      <Wrapper>
        Hello worl
      </Wrapper>
    </>
  )

}
