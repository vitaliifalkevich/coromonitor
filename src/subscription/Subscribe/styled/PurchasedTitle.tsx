import styled from 'styled-components'

const PurchasedTitle = styled.span<{ isChecked?: boolean }>`
  margin-right: 0.2em;
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.fonts.extraBold};
  font-size: 0.9em;
  color: ${({ theme, isChecked }) =>
    isChecked ? theme.colors.buttonTextColor : theme.colors.purchasedItemColor};
`

export default PurchasedTitle
