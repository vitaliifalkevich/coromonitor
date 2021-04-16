import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from 'components/PreloadedEntities/slice'
import { useHistory } from 'react-router-dom'
import { getCountriesToFollow } from '../PreloadedEntities/selectors'
import { Button } from './styled'
import themes from './themes'
import ComponentThemeProvider from 'styles/theme/ComponentThemeProvider'

interface ButtonProps {
  btnType: string
  countryName: string
}
const BtnNavigate: React.FC<ButtonProps> = ({ btnType, countryName }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const countriesToFollow = useSelector(getCountriesToFollow)

  const onButtonClick = useCallback(() => {
    if (countryName) {
      history.push(`/country/${countryName}`)
      dispatch(
        actions.changeCurrentPage(
          countriesToFollow.findIndex(item => item.name === countryName),
        ),
      )
    } else {
      history.push(`/`)
      actions.changeCurrentPage(0)
    }
  }, [history, dispatch, countryName, countriesToFollow])

  return (
    <ComponentThemeProvider themes={themes}>
      <Button btnType={btnType} onClick={onButtonClick}>
        <span>{countryName ? countryName : 'Global'}</span>
      </Button>
    </ComponentThemeProvider>
  )
}

export default BtnNavigate
