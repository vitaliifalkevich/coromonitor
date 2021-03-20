import styled, { css } from 'styled-components'
import paginationActive from 'assets/img/paginationActive.png'

const activeStyles = css`
  background: url(${paginationActive}) no-repeat;
  width: 14px;
  height: 14px;
  margin-bottom: -3px;
`

const PaginationDot = styled.li<{ isActive?: boolean }>`
  width: 8px;
  margin: 0 3px;
  border-radius: 20px;
  height: 8px;
  display: inline-block;
  background: ${({ theme }) => theme.colors.paginationDot};
  ${({ isActive }) => isActive && activeStyles};
`

export default PaginationDot
