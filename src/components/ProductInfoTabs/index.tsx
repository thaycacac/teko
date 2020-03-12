import React from 'react'
import styled from 'styled-components'
import { Product } from '../../repositories/products'
import { ProductSpec } from '../ProductSpec'

interface ProductInfoTabsProps {
  product: Product;
}
interface TabProps {
  active?: boolean;
}
const Container = styled.div`
  background-color: ${props => props.theme.colors.white};
  margin-bottom: 8pt;
`
const Tabs = styled.div`
display: flex;
border-bottom: 1px solid rgb(238, 241, 243);
`

const Tab = styled.div<TabProps>`
flex: 1;
padding: 12pt;
text-align: center;
${props => {
  if (props.active) {
    return `
      color: ${props.theme.colors.darkGrey};
      border-bottom: 2pt solid ${props.theme.colors.reddishOrange};
    `
  }
  return `
    color: ${props.theme.colors.coolGrey};
  `
}}
`

export const ProductInfoTabs: React.FunctionComponent<ProductInfoTabsProps> = ({ product }: ProductInfoTabsProps) => (
  <Container>
    <Tabs>
      <Tab>Mô tả sản phẩm</Tab>
      <Tab active>Thông số kỹ thuật</Tab>
      <Tab>So sánh giá</Tab>
    </Tabs>
    <ProductSpec attributeGroups={product.attributeGroups} />
  </Container>
)
