import styled from 'styled-components'

const CasesContainer = styled.ul`
  font-family: ${({ theme }) => theme.fonts.regular};
  line-height: 0.94em;
  position: absolute;
  width: 8em;
  left: 50%;
  margin-left: -4em;
  text-align: center;
  margin-top: 4.3em;
`

export default CasesContainer
