import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import {
  getCountriesToFollow,
  getCurrentPage,
} from 'components/PreloadedEntities/selectors'
import { ListContainer, PaginationDot } from './styled'
import themes from './themes'
import LocalThemeProvider from 'styles/theme/LocalThemeProvider'

interface PaginationProps {
  countryName?: string
}
const Pagination: React.FC<PaginationProps> = ({ countryName }) => {
  const countriesToFollow = useSelector(getCountriesToFollow)
  const currentPage = useSelector(getCurrentPage)

  const paginationDots = useMemo(() => {
    let paginationDotsOrigin = countriesToFollow.map((item, idx) => (
      <PaginationDot key={`pagination_dots_${idx}`} />
    ))

    paginationDotsOrigin.splice(
      currentPage,
      0,
      <PaginationDot key={`pagination_dot_active`} isActive={true} />,
    )
    return paginationDotsOrigin
  }, [countriesToFollow, currentPage])

  return (
    <LocalThemeProvider themes={themes}>
      <ListContainer>{paginationDots}</ListContainer>
    </LocalThemeProvider>
  )
}

export default Pagination
