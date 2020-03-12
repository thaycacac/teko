import React from 'react'
import styled from 'styled-components'
import { ProductImage } from '../../repositories/products'

interface ProductImageSlideProps {
  image: ProductImage;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${props => props.theme.colors.white};
`

const ImageWrapper = styled.div`
  max-width: 330pt;
  img {
    width: 100%;
  }
`

export const ProductImageSlide: React.FunctionComponent<ProductImageSlideProps> = ({ image }: ProductImageSlideProps) => (
  <Container className="swiper-slide">
    <ImageWrapper>
      <img src={image.url} />
    </ImageWrapper>
  </Container>
)
