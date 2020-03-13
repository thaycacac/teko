import React, { useEffect, useCallback, useState } from 'react'
import styled from 'styled-components'
import { get, search, Product } from '../../repositories/products'
import { NavigationBar } from '../../components/NavigationBar'
import { CartIcon } from '../../components/CartIcon'
import { ProductNavigationTitle } from '../../components/ProductNavigationTitle'
import { ProductImages } from '../../components/ProductImages'
import { ProductInfo } from '../../components/ProductInfo'
import { ProductInfoTabs } from '../../components/ProductInfoTabs'
import { SimilarProducts } from '../../components/SimilarProducts'
import { AddToCartBar } from '../../components/AddToCartBar'
import { useCartState } from '../../contexts/cart'

interface ProductDetailProps {
  sku: string;
}

const Wrapper = styled.div`
  overflow-y: auto;
  height: calc(100% - 44pt);
  background-color: ${props => props.theme.colors.paleGrey};
  padding-bottom: 50pt;
`

export const ProductDetail: React.FunctionComponent<ProductDetailProps> = ({ sku }: ProductDetailProps) => {
  const [, setIsLoading] = useState(false)
  const cartState = useCartState()
  const [product, setProduct] = useState<Product | undefined>()
  const [similarProducts, setSimilarProducts] = useState<Array<Product>>([])
  const fetchProduct = useCallback(async () => {
    setIsLoading(true)
    const data = await get(sku)
    setProduct(data)
    setIsLoading(false)
  }, [sku])

  const fetchSimilarProducts = useCallback(async (categoryId: number) => {
    const { result } = await search({
      _page: 1,
      saleCategories: categoryId,
      _limit: 10,
    })
    setSimilarProducts(result.products)
  }, [])

  useEffect(() => {
    fetchProduct()
  }, [sku])

  useEffect(() => {
    if (product && product.saleCategories.length > 0) {
      fetchSimilarProducts(product.saleCategories[0].id)
    }
  }, [product])

  return (
    <>
      <NavigationBar
        variant="secondary"
        rightNode={<CartIcon totalItems={cartState.totalItems} />}
      >
        {product && (
          <ProductNavigationTitle product={product} />
        )}
      </NavigationBar>
      {product && (
        <Wrapper>
          <ProductImages images={product.images} />
          <ProductInfo product={product} />
          <ProductInfoTabs product={product} />
          {similarProducts.length > 0 && (
            <SimilarProducts products={similarProducts} />
          )}
          <AddToCartBar cartState={cartState} product={product} />
        </Wrapper>
      )}
    </>
  )

}
