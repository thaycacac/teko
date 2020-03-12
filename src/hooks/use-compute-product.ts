import { useMemo } from 'react'
import { Product } from 'repositories/products'

type ComputedProduct = Product & {
  displayImage: string;
  promotion?: PromotionDisplay;
}

interface PromotionDisplay {
  orginalPrice: number;
  discountPercent: number;
}
export function useComputeProduct(product: Product): ComputedProduct {
  return useMemo<ComputedProduct>(() => {
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
}
