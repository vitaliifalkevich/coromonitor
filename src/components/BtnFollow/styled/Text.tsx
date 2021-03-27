import styled from 'styled-components'

const Text = styled.span`
  color: ${({ theme }) => theme.colors.buttonTextColor};
  margin-top: -4.8em;
  display: block;
  font-family: ${({ theme }) => theme.fonts.extraBold};
  text-transform: uppercase;
  font-size: 0.95em;
  &:active span,
  &:focus span,
  &:hover span {
    margin-top: -4.4em;
  }
`

export default Text
