import React from 'react'
import styled from 'styled-components'
import { Product } from '../../repositories/products'
import { thoundsandDelimiter } from '../../helpers/number'
import Sup from '../Styled/Sup'
import { DiscountValue } from '../Styled/DiscountValue'
import { OriginalPrice } from '../Styled/OriginalPrice'
import { ProductPrice } from '../Styled/ProductPrice'
import { useComputeProduct } from '../../hooks/use-compute-product'

interface ProductRowProps {
  product: Product;
  onClick: (e: MouseEvent) => void;
}

const Wrapper = styled.a`
  display: flex;
  width: 100%;
  background-color: ${props => props.theme.colors.white};
  border: 0;
  box-shadow: 0 -1pt 0 0 ${props => props.theme.colors.paleGrey} inset;
  margin-bottom: 4pt;
  padding: 12pt;
`

const ProductImage = styled.img`
  width: 80pt;
  height: 80pt;
`

const ProductInfo = styled.div`
  margin-left: 12pt;
`

const ProductName = styled.h3`
font-size: 1rem;
`

const PromotionPrice = styled.div`
display: flex;
align-items: center;
`

export const ProductRow: React.FunctionComponent<ProductRowProps> = ({ product, onClick }: ProductRowProps) => {
  const computedProduct = useComputeProduct(product)
  return (
    <Wrapper onClick={onClick}>
      <ProductImage src={computedProduct.displayImage} />
      <ProductInfo>
        <ProductName>{computedProduct.displayName}</ProductName>
        {computedProduct.price.sellPrice && (
          <ProductPrice>
            {thoundsandDelimiter(computedProduct.price.sellPrice)}
            <Sup>đ</Sup>
          </ProductPrice>
        )}
        {computedProduct.promotion && (
          <PromotionPrice>
            <OriginalPrice>
              {thoundsandDelimiter(computedProduct.promotion.orginalPrice)}
            </OriginalPrice>
            <DiscountValue>
              <span>-{computedProduct.promotion.discountPercent}%</span>
            </DiscountValue>
          </PromotionPrice>
        )}
      </ProductInfo>
    </Wrapper>
  )
}

export default React.memo(ProductRow)
