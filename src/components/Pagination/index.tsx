import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import {
  getCountriesToFollow,
  getCurrentPage,
} from 'components/PreloadedEntities/selectors'
import { ListContainer, PaginationDot } from './styled'
import themes from './themes'
import ComponentThemeProvider from 'styles/theme/ComponentThemeProvider'

interface PaginationProps {
  countryName?: string
}
const Pagination: React.FC<PaginationProps> = ({ countryName }) => {
  const countriesToFollow = useSelector(getCountriesToFollow)
  const currentPage = useSelector(getCurrentPage)

  const paginationDots = useMemo(() => {
    let pagination = countriesToFollow.map((item, idx) => (
      <PaginationDot key={`pagination_dots_${idx}`} />
    ))

    if (countryName) {
      pagination.splice(
        currentPage + 1,
        0,
        <PaginationDot key={`pagination_dot_active`} isActive={true} />,
      )
    } else {
      pagination.splice(
        currentPage,
        0,
        <PaginationDot key={`pagination_dot_active`} isActive={true} />,
      )
    }

    return pagination
  }, [countriesToFollow, currentPage, countryName])

  return (
    <ComponentThemeProvider themes={themes}>
      <ListContainer>{paginationDots}</ListContainer>
    </ComponentThemeProvider>
  )
}

export default Pagination
