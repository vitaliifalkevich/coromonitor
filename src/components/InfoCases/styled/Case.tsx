import styled from 'styled-components'

const Case = styled.li<{ type: 'confirmed' | 'recovered' | 'deaths' }>`
  color: ${({ theme, type }) => theme.colors?.[type]};
  span {
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: 0.7em;
    line-height: 0.5;
    text-align: center;
  }
`

export default Case
