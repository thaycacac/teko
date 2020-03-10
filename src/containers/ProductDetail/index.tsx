import React from 'react'
import styled from 'styled-components'
import { NavigationBar } from '../../components/NavigationBar'
import { useNavigationDispatch } from '../../contexts/navigation'
import { CartIcon } from '../../components/CartIcon'

const DummyButton = styled.button`
  width: 100%;
  height: 100px;
`
const TitleContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  h3, p {
    margin-bottom: 0;
  }
`

const NavigationTitle = styled.h3``

const NavigationSubTitle = styled.p`
color: ${props => props.theme.colors.tomato};
`

export const ProductDetail: React.FunctionComponent = () => {
  const dispatch = useNavigationDispatch()
  return (
    <>
      <NavigationBar
        variant="secondary"
        rightNode={<CartIcon />}
      >
        <TitleContainer>
          <NavigationTitle>
            Bo vi xu ly
          </NavigationTitle>
          <NavigationSubTitle>
            10.420.000 d
          </NavigationSubTitle>
        </TitleContainer>
      </NavigationBar>
      <DummyButton
        onClick={
          (): void => dispatch({
            type: 'PUSH',
            payload: {
              name: 'PRODUCT_DETAIL',
              payload: {
                productId: 'productid',
              }
            }
          })}
        >
          Next
        </DummyButton>
    </>
  )

}
