import React from 'react'
import styled from 'styled-components'
import Sup from '../Styled/Sup'
import { Product } from '../../repositories/products'
import { thoundsandDelimiter } from '../../helpers/number'

const TitleContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  h5, p {
    margin-bottom: 0;
  }
`

const NavigationTitle = styled.h5`
font-size: 13pt;
`

const NavigationSubTitle = styled.p`
  color: ${props => props.theme.colors.tomato};
`

interface ProductNavigationTitleProps {
  product: Product;
}
export const ProductNavigationTitle: React.FunctionComponent<ProductNavigationTitleProps> = ({ product }: ProductNavigationTitleProps) => (
  <TitleContainer>
    <NavigationTitle>
      {product.displayName}
    </NavigationTitle>
    {product.price.sellPrice && (
      <NavigationSubTitle>
        {thoundsandDelimiter(product.price.sellPrice)}
        <Sup>đ</Sup>
      </NavigationSubTitle>
    )}
  </TitleContainer>
)
