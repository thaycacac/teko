import styled from 'styled-components'

export const DiscountValue = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 6pt;
  span {
    color: #FFF;
    background: rgb(232,32,32);
    background: linear-gradient(90deg, rgba(232,32,32,1) 0%, ${props => props.theme.colors.reddishOrange} 100%);
    padding: 2pt 2pt 2pt 0;
    border-top-right-radius: 2pt;
    border-bottom-right-radius: 2pt;
    font-size: 0.8rem;
    margin-left: -6pt;
    z-index: 1001;
  }
  :before {
    z-index: 1000;
    content: ' ';
    width: 12.3pt;
    height: 12.3pt;
    background: rgb(232,32,32);
    transform: rotate(45deg);
    border-bottom-left-radius: 2pt;
  }
`
