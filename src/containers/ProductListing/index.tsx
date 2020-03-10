import React from 'react'
import styled from 'styled-components'
import { NavigationBar } from '../../components/NavigationBar'
import { useNavigationDispatch } from '../../contexts/navigation'

const DummyButton = styled.button`
  width: 100%;
  height: 100px;
`

const InputWrapper = styled.div`
  flex: 1;
  background-color: ${props => props.theme.colors.white};
  border-radius: 8pt;
  height: 32pt;
  box-shadow: 0 2pt 4pt 0 ${props => props.theme.colors.black30};
  display: flex;
  align-items: center;
  padding: 0 8pt;
`

const Input = styled.input`
  border: 0;
  width: 100%;
  height: 100%;
  border-radius: 8pt;
  &:focus {
    outline: none;
  }
`

const SearchIconWrapper = styled.div`
  margin-right: 2pt;
`

export const ProductListing: React.FunctionComponent = () => {
  const dispatch = useNavigationDispatch()
  return (
    <>
      <NavigationBar>
        <InputWrapper>
          <SearchIconWrapper>
            <img src="/public/images/Search.png" srcSet="/public/images/Search@2x.png 2x, /public/images/Search@3x.png 3x" />
          </SearchIconWrapper>
          <Input placeholder="Nhập tên, mã sản phẩm" />
        </InputWrapper>
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
