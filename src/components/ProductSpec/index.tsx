import React, { useState } from 'react'
import { ProductAttributeGroup, ProductAttributeValue } from '../../repositories/products'
import styled from 'styled-components'

interface ProductSpecProps {
  attributeGroups: Array<ProductAttributeGroup>;
}

interface FullProps {
  full: boolean;
}

const Container = styled.div`
padding: 12pt;
`

const Table = styled.table`
width: 100%;


tr {
  td {
    padding: 8pt;
    &:last-child {
      text-align: right;
    }
  }
  &:nth-child(odd) {
    background: rgb(238, 241, 243);
  }
  &:first-child {
    td:first-child {
      border-top-left-radius: 8pt;
    }
    td:last-child {
      border-top-right-radius: 8pt;
    }
  }
  &:last-child {
    td:first-child {
      border-bottom-left-radius: 8pt;
    }
    td:last-child {
      border-bottom-right-radius: 8pt;
    }
  }
}
`

const Wrapper = styled.div<FullProps>`
  ${props => props.full ? '' : `
    max-height: 150pt;
    overflow: hidden;
    position: relative;
    &:after {
      position: absolute;
      height: 80pt;
      bottom: 0;
      left: 0;
      right: 0;
      content: ' ';
      background: rgb(255,255,255);
      background: linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%);
    }
  `}
`
const Button = styled.button<FullProps>`
  width: 100%;
  background-color: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.deepSkyBlue};
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    ${props => props.full ? 'transform: rotate(180deg)' : ''}
  }
`

export const ProductSpec: React.FunctionComponent<ProductSpecProps> = ({ attributeGroups }: ProductSpecProps) => {
  const [full, setFull] = useState<boolean>(false)
  return (
    <Container>
      <Wrapper full={full}>
        <Table>
          <tbody>
            {attributeGroups.map((attribute, index) => (
              <tr key={index}>
                <td>{attribute.name}</td>
                <td>{attribute.value}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Wrapper>
      <Button full={full} onClick={() => setFull(prevState => !prevState)}>
        Hiển thị {full ? 'bớt đi' : 'nhiều hơn'} <img src="/public/images/ChevronDown.png" srcSet="/public/images/ChevronDown@2x.png 2x, /public/images/ChevronDown@3x.png 3x" />
      </Button>
    </Container>
  )
}
