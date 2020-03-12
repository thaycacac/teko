import React from 'react'
import { Swiper } from '../Swiper'
import { ProductImage } from '../../repositories/products'
import { ProductImageSlide } from '../ProductImageSlide'

interface ProductImagesProps {
  images: Array<ProductImage>;
}
export const ProductImages: React.FunctionComponent<ProductImagesProps> = ({ images }: ProductImagesProps) => (
  <Swiper pagination={{ el: '.swiper-pagination' }}>
    {images.map((image, index) => (
      <ProductImageSlide key={index} image={image} />
    ))}
  </Swiper>
)
