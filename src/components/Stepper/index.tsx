import React from 'react'
import styled from 'styled-components'

interface StepperProps {}

const Container = styled.div`
  display: flex;
  align-items: center;
`
const Button = styled.button`
  background-color: transparent;
  border: 0;
`

const Value = styled.div`
margin-left: 12pt;
margin-right: 12pt;
color: ${props => props.theme.colors.darkGrey};
`

export const Stepper: React.FunctionComponent<StepperProps> = (props: StepperProps) => {
  return (
    <Container>
      <Button>
        <img src="/public/images/RemoveCircle.png" srcSet="/public/images/RemoveCircle@2x.png 2x, /public/images/RemoveCircle@3x.png 3x" />
      </Button>
      <Value>2</Value>
      <Button>
        <img src="/public/images/AddCircle.png" srcSet="/public/images/AddCircle@2x.png 2x, /public/images/AddCircle@3x.png 3x" />
      </Button>
    </Container>
  )
}
