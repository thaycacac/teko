import React from 'react'
import styled from 'styled-components'
import { NavigationBar } from '../../components/NavigationBar'

const DummyContent = styled.div`
  width: 100%;
  height: 100px;
  background-color: #CCC;
`

export const ProductDetail: React.FunctionComponent = () => (
  <>
    <NavigationBar />
    <DummyContent />
  </>
)
