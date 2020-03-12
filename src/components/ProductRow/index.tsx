import React, { useMemo } from 'react'
import styled from 'styled-components'
import { Product } from '../../repositories/products'
import { thoundsandDelimiter } from '../../helpers/number'
import Sup from '../Styled/Sup'

interface ProductRowProps {
  product: Product;
  onClick: (e: MouseEvent) => void;
}

type ComputedProduct = Product & {
  displayImage: string;
  promotion?: PromotionDisplay;
}

interface PromotionDisplay {
  orginalPrice: number;
  discountPercent: number;
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
const ProductPrice = styled.h3`
  font-weight: 700;
  font-size: 1rem;
  color: ${props => props.theme.colors.tomato}
`

const PromotionPrice = styled.div`
display: flex;
align-items: center;
`
const DiscountValue = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 6pt;
  span {
    color: #FFF;
    background: rgb(232,32,32);
    background: linear-gradient(90deg, rgba(232,32,32,1) 0%, ${props => props.theme.colors.reddishOrange} 100%);
    padding: 2pt 2pt 2pt 0;
    border-top-right-radius: 2pt;
    border-bottom-right-radius: 2pt;
    font-size: 0.8rem;
    margin-left: -6pt;
    z-index: 1001;
  }
  :before {
    z-index: 1000;
    content: ' ';
    width: 12.3pt;
    height: 12.3pt;
    background: rgb(232,32,32);
    transform: rotate(45deg);
    border-bottom-left-radius: 2pt;
  }
`

const OriginalPrice = styled.span`
  color: ${props => props.theme.colors.coolGrey};
  text-decoration: line-through;
`

export const ProductRow: React.FunctionComponent<ProductRowProps> = ({ product, onClick }: ProductRowProps) => {
  const computedProduct = useMemo<ComputedProduct>(() => {
    let displayImage = '/public/images/Thumbnail.png'
    if (product.images.length > 0) {
      const priorityImages = product.images.sort((a, b) => a.priority - b.priority)
      displayImage = priorityImages[0].url
    }
    let promotion: PromotionDisplay | undefined
    if (product.promotionPrices.length > 0) {
      let promotionPrice = product.promotionPrices[0].promotionPrice
      let finalPrice = product.promotionPrices[0].finalPrice
      // TODO: Because I couldn't see promotion prices, for demo purpose I will randomly add promotion to the product.
      if (Math.random() >= 0.5) {
        const fakeDicount = (finalPrice * .25)
        promotionPrice = finalPrice
        finalPrice = finalPrice + fakeDicount
      }
      if (promotionPrice) {
        const discountValue = finalPrice - promotionPrice
        const discountPercent = Math.round((discountValue / finalPrice) * 100)
        promotion = {
          orginalPrice: finalPrice,
          discountPercent: discountPercent,
        }
      }
    }
    return Object.assign({}, product, {
      displayImage,
      promotion,
    })
  }, [product])
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
