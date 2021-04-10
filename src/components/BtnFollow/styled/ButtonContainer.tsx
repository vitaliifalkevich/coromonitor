import styled from 'styled-components'

const ButtonContainer = styled.button`
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
    span {
      margin-top: -4.7em;
    }
  }
`

export default ButtonContainer
