import React from 'react'
import styled from 'styled-components'
import { Product } from '../../repositories/products'
import { ProductSmall } from '../ProductSmall'
import { Swiper } from '../Swiper'

interface SimilarProductsProps {
  products: Array<Product>;
}

const Container = styled.div`
  background-color: ${props => props.theme.colors.white};
`
const Title = styled.h3`
margin: 0;
padding: 12pt;
font-size: 13pt;
color: ${props => props.theme.colors.coolGrey};
`

export const SimilarProducts: React.FunctionComponent<SimilarProductsProps> = ({ products }: SimilarProductsProps) => {
  return (
    <Container>
      <Title>
        Sản phẩm cùng loại
      </Title>
      <Swiper slidesPerView="auto" spaceBetween={30}>
        {products.map((product) => (
          <ProductSmall key={product.sku} product={product} />
        ))}
      </Swiper>
    </Container>
  )
}
