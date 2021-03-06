import styled from 'styled-components'

const Button = styled.button`
  outline: none;
  border: 0;
  display: block;
  position: absolute;
  left: 0;
  margin-left: 0;
  bottom: -8em;
  height: 10em;
  background: ${({ theme }) => theme.colors.buttonDefaultColor};
  width: 100%;
  border-radius: 5em;
  z-index: 100;
  &:hover,
  &:active,
  &:focus {
    background: ${({ theme }) => theme.colors.buttonActiveColor};
    border: 0.4em solid ${({ theme }) => theme.colors.borderActiveBtn};
    bottom: -7.6em;
  }
`

export default Button
