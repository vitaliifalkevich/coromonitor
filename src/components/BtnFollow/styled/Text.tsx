import styled from 'styled-components'

const Text = styled.span`
  color: ${({ theme }) => theme.colors.buttonTextColor};
  margin-top: -5.15em;
  display: block;
  font-family: ${({ theme }) => theme.fonts.extraBold};
  text-transform: uppercase;
  font-size: 0.9em;
`

export default Text
