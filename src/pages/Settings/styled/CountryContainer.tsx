import styled, { css } from 'styled-components'

const checkedStyles = css`
  background: ${({ theme }) => theme.colors.listItemChecked};
  border-radius: 10px;
`

const CountryContainer = styled.li<{ isChecked: boolean }>`
  position: relative;
  width: 9em;
  margin: 0.2em auto;
  padding: 0.2em 0.3em;
  text-align: center;
  ${({ isChecked }) => isChecked && checkedStyles}
  $ &:last-child {
    height: 1.2em;
    opacity: 0;
  }
`

export default CountryContainer
