import React from 'react'
import styled from 'styled-components'
import { Product } from '../../repositories/products'
import { useComputeProduct } from '../../hooks/use-compute-product'
import { thoundsandDelimiter } from '../../helpers/number'
import saleStatusMap from './status.json'
import { Sup } from '../Styled/Sup'
import { OriginalPrice } from '../Styled/OriginalPrice'
import { DiscountValue } from '../Styled/DiscountValue'

interface ProductInfoProps {
  product: Product;
}

const Container = styled.div`
  padding: 12pt;
  background-color: ${props => props.theme.colors.white};
  border-top: 1px solid ${props => props.theme.colors.paleGrey};
  margin-bottom: 8pt;
`
const ProductTitle = styled.h3`
  font-size: 17pt;
  color: ${props => props.theme.colors.darkGrey};
`
const ProductSKU = styled.span`
  color: ${props => props.theme.colors.deepSkyBlue};
`

const ProductSKUKey = styled.span`
  color: ${props => props.theme.colors.coolGrey};
`

const ProductStatus = styled.span`
  background-color: rgb(238, 241, 243);
  color: ${props => props.theme.colors.coolGrey};
  font-size: 12pt;
  padding: 3pt 8pt;
  border-radius: 8pt;
`
const ProductStatusWrapper = styled.div`
  margin-bottom: 8pt;
`

const ProductPriceWrapper = styled.div`
  margin-top: 8pt;
  display: flex;
  align-items: center;
`

const StyledProductPrice = styled.h3`
  font-size: 17pt;
  font-weight: 700;
  color: ${props => props.theme.colors.tomato};
  margin-bottom: 0;
`

const Spacer = styled.span`
width: 8pt;
`

export const ProductInfo: React.FunctionComponent<ProductInfoProps> = ({ product }: ProductInfoProps) => {
  const computedProduct = useComputeProduct(product)
  return (
    <Container>
      <ProductTitle>
        {product.displayName}
      </ProductTitle>
      <ProductStatusWrapper>
        <ProductSKUKey>Mã SP: </ProductSKUKey>
        <ProductSKU>
          {product.sku}
        </ProductSKU>
      </ProductStatusWrapper>
      <div>
        <ProductStatus>
          {saleStatusMap[product.status.sale] || product.status.sale}
        </ProductStatus>
      </div>
      <ProductPriceWrapper>
        <StyledProductPrice>
          {thoundsandDelimiter(computedProduct.price.sellPrice)}
          <Sup>đ</Sup>
        </StyledProductPrice>
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
