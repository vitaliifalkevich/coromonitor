import styled from 'styled-components'

const PayButton = styled.button`
  outline: none;
  border: 0;
  display: block;
  position: absolute;
  height: 10em;
  background: ${({ theme }) => theme.colors.buttonDefaultColor};
  width: 100%;
  border-radius: 5em;
  z-index: 100;
  left: 0;
  margin-left: 0;
  bottom: -8em;
  &:active,
  &:focus,
  &:hover {
    background: ${({ theme }) => theme.colors.buttonActiveColor};
    border: 0.4em solid ${({ theme }) => theme.colors.borderActiveBtn};
    bottom: -7.6em;
  }
  span {
    color: ${({ theme }) => theme.colors.buttonTextColor};
    margin-top: -4.8em;
    display: block;
    font-family: ${({ theme }) => theme.fonts.extraBold};
    text-transform: uppercase;
    font-size: 0.95em;
    &:active,
    &:focus,
    &:hover {
      margin-top: -4.4em;
    }
  }
`
export default PayButton
