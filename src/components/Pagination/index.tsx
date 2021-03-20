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
      <PaginationDot key={idx} />
    ))

    const sliceStart = countryName ? currentPage : currentPage + 1
    return paginationDotsOrigin.splice(
      sliceStart,
      0,
      <PaginationDot key={sliceStart} isActive={true} />,
    )
  }, [countryName, countriesToFollow, currentPage])

  return (
    <LocalThemeProvider themes={themes}>
      <ListContainer>{paginationDots}</ListContainer>
    </LocalThemeProvider>
  )
}

export default Pagination
