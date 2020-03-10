import React from 'react'
import styled from 'styled-components'
import { useNavigationDispatch } from '../../contexts/navigation'

const Container = styled.div`
  height: 44pt;
  background: rgb(232,32,32);
  background: linear-gradient(90deg, rgba(232,32,32,1) 0%, ${props => props.theme.colors.reddishOrange} 100%);
  padding: 8pt 11pt;
  display: flex;
  align-items: center;
`
const BackIconWrapper = styled.button`
  width: 24pt;
  height: 24pt;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 11pt;
  border: none;
  background-color: transparent;
`
const InputWrapper = styled.div`
  flex: 1;
  background-color: ${props => props.theme.colors.white};
  border-radius: 8pt;
  height: 32pt;
  box-shadow: 0 2pt 4pt 0 ${props => props.theme.colors.black30};

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

export const NavigationBar: React.FunctionComponent = () => {
  const dispatch = useNavigationDispatch()
  return (
    <Container>
      <BackIconWrapper onClick={() => dispatch({ type: 'POP' })}>
        <img src="/public/images/arrowBack.png" srcSet="/public/images/arrowBack@2x.png 2x, /public/images/arrowBack@3x.png 3x" />
      </BackIconWrapper>
      <InputWrapper>
        <Input placeholder="Nhập tên, mã sản phẩm" />
      </InputWrapper>
    </Container>
  )
}
