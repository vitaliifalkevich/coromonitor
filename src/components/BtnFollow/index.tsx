import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { ButtonContainer, Text } from './styled'
import { actions } from 'components/PreloadedEntities/slice'
import { getCountriesToFollow } from '../PreloadedEntities/selectors'
import ComponentThemeProvider from 'styles/theme/ComponentThemeProvider'
import themes from './themes'

const BtnFollow: React.FC<{ btnType: string }> = ({ btnType }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const countriesToFollow = useSelector(getCountriesToFollow)

  const onButtonClick = useCallback(() => {
    dispatch(actions.followCountry(countriesToFollow))
    history.push(`/`)
    dispatch(actions.changeCurrentPage(0))
  }, [dispatch, history, countriesToFollow])

  return (
    <ComponentThemeProvider themes={themes}>
      <ButtonContainer onClick={onButtonClick}>
        <Text>{btnType}</Text>
      </ButtonContainer>
    </ComponentThemeProvider>
  )
}

export default BtnFollow
