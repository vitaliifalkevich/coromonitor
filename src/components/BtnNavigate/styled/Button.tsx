import styled, { css } from 'styled-components'

const prevStyles = css`
  left: -8.7em;
  span {
    margin-left: 9.2em;
  }
  &:hover {
    left: -8.3em;
  }
  &:hover span {
    margin-left: 8.2em;
  }
`
const nextStyles = css`
  right: -8.7em;
  span {
    margin-left: -1.9em;
  }
  &:active,
  &:focus,
  &:hover {
    right: -8.3em;
  }
  &:active span,
  &:focus span,
  &:hover span {
    left: -1.5em;
  }
`

const Button = styled.button<{ btnType: string }>`
  outline: none;
  border: 0;
  display: block;
  position: absolute;
  height: 10em;
  background: ${({ theme }) => theme.colors.buttonDefaultColor};
  width: 100%;
  border-radius: 5em;
  z-index: 100;
  top: 0;
  margin-top: 0;
  span {
    width: 5.5em;
    color: ${({ theme }) => theme.colors.buttonTextColor};
    display: block;
    font-family: ${({ theme }) => theme.fonts.extraBold};
    text-transform: uppercase;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transform: rotate(-90deg);
    font-size: 0.8em;
  }
  &:active,
  &:focus,
  &:hover {
    background: ${({ theme }) => theme.colors.buttonActiveColor};
    border: 0.4em solid ${({ theme }) => theme.colors.borderActiveBtn};
  }
  ${({ btnType }) => (btnType === 'prev' ? prevStyles : nextStyles)}
`

export default Button
