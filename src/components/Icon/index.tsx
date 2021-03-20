import React, { useCallback } from 'react'
import { Button } from './styled'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCountriesToFollow } from '../PreloadedEntities/selectors'
import { actions } from 'components/PreloadedEntities/slice'

interface IconProps {
  iconType: string
  countryName?: string
}
const Icon: React.FC<IconProps> = ({ iconType, countryName }) => {
  const history = useHistory()
  const countriesToFollow = useSelector(getCountriesToFollow)
  const dispatch = useDispatch()

  const navigate = useCallback(
    (path: string) => {
      history.push(`/${path}/${countryName}`)
    },
    [history, countryName],
  )

  const unfollow = useCallback(() => {
    let countryIndex = countriesToFollow.findIndex(
      item => item.name === countryName,
    )
    let newCountryArray = [...countriesToFollow]
    newCountryArray.splice(countryIndex, 1)
    dispatch(actions.followCountry(newCountryArray))
    history.push(`/`)
    dispatch(actions.changeCurrentPage(0))
  }, [countriesToFollow, countryName, dispatch, history])

  const onButtonClick = useCallback(
    e => {
      switch (iconType) {
        case 'statistic':
          return navigate('statistic')
        case 'back':
          return navigate('country')
        case 'trash':
          return unfollow()
        default:
          history.push(`/${e.target.id}`)
      }
    },
    [history, iconType, navigate, unfollow],
  )
  return <Button id={iconType} typeIcon={iconType} onClick={onButtonClick} />
}

export default Icon
