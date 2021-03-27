import React, { useCallback } from 'react'
import { CountryContainer } from './styled'
import { useDispatch } from 'react-redux'
import { actions } from 'components/PreloadedEntities/slice'

interface CountryProps {
  name: string
  isChosen: boolean
}
const Country: React.FC<CountryProps> = ({ name, isChosen }) => {
  const dispatch = useDispatch()

  const changeFollowCountryStatus = useCallback(() => {
    dispatch(
      actions.changeFollowCountryStatus({
        name,
        isChosen: !isChosen,
      }),
    )
  }, [name, isChosen, dispatch])

  return (
    <CountryContainer isChecked={isChosen} onClick={changeFollowCountryStatus}>
      <span>{name}</span>
    </CountryContainer>
  )
}

export default Country
