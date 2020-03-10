import React from 'react'
import styled from 'styled-components'
import { NavigationBar } from '../../components/NavigationBar'
import { useNavigationDispatch } from '../../contexts/navigation'

const DummyButton = styled.button`
  width: 100%;
  height: 100px;
`

export const ProductListing: React.FunctionComponent = () => {
  const dispatch = useNavigationDispatch()
  return (
    <>
      <NavigationBar />
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
