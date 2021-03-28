import styled, { css } from 'styled-components'

const checkedStyles = css`
  background: ${({ theme }) => theme.colors.buttonActiveColor};
  border: 1px solid ${({ theme }) => theme.colors.borderActiveBtn};
`

const Item = styled.li<{ isChecked?: boolean }>`
  position: relative;
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 0.85em;
  border: 1px solid ${({ theme }) => theme.colors.purchaseItemBorder};
  border-radius: 5em;
  padding: 0 0.3em 0 0;
  width: 85%;
  display: block;
  margin: 0.3em auto;
  text-align: center;
  cursor: pointer;
  ${({ isChecked }) => isChecked && checkedStyles}
`

export default Item
