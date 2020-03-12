import React from 'react'
import styled from 'styled-components'
import { Product } from '../../repositories/products'
import { useComputeProduct } from '../../hooks/use-compute-product'
import { thoundsandDelimiter } from '../../helpers/number'
import { Sup } from '../Styled/Sup'
import { OriginalPrice } from '../Styled/OriginalPrice'
import { DiscountValue } from '../Styled/DiscountValue'
import { ProductPrice } from '../Styled/ProductPrice'
import { useNavigationDispatch } from '../../contexts/navigation'

interface ProductSmallProps {
  product: Product;
}

const Container = styled.div`
width: 200pt !important;
padding: 8pt;
`

const ImageWrapper = styled.div`
height: 200pt;
width: 200pt;
img {
  width: 100%;
  height: 100%;
}
`
const ProductTitle = styled.h3`
  font-size: 14pt;
  color: ${props => props.theme.colors.darkGrey};
  font-weight: 400;
  line-height: 1em;
  height: 2em;
  overflow: hidden;
`

const Spacer = styled.span`
width: 8pt;
`

const ProductPriceWrapper = styled.div`
  display: flex;
  align-items: center;
`

export const ProductSmall: React.FunctionComponent<ProductSmallProps> = ({ product }: ProductSmallProps) => {
  const computedProduct = useComputeProduct(product)
  const dispatch = useNavigationDispatch()
  return (
    <Container
      className="swiper-slide"
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
    >
      <ImageWrapper>
        <img src={computedProduct.displayImage} />
      </ImageWrapper>
      <ProductTitle>
        {product.displayName}
      </ProductTitle>
      <ProductPriceWrapper>
        <ProductPrice>
          {thoundsandDelimiter(computedProduct.price.sellPrice)}
          <Sup>đ</Sup>
        </ProductPrice>
        {computedProduct.promotion && (
            <>
              <Spacer />
              <OriginalPrice>
                {thoundsandDelimiter(computedProduct.promotion.orginalPrice)}
              </OriginalPrice>
              <Spacer />
              <DiscountValue>
                <span>-{computedProduct.promotion.discountPercent}%</span>
              </DiscountValue>
            </>
          )}
      </ProductPriceWrapper>
    </Container>
  )
}
