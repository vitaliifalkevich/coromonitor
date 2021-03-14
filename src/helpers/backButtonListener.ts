import { RouteComponentProps } from 'react-router-dom'

const backHomeListener = (
  event: any,
  history: RouteComponentProps['history'],
  changeActivePage: (index: number) => void,
  countryName?: string,
  countriesToFollow?: string[],
) => {
  if (event.keyName === 'back') {
    if (countryName && countriesToFollow) {
      history.push(`/country/${countryName}`)
      changeActivePage(
        countriesToFollow.findIndex(item => item === countryName),
      )
    } else {
      history.push('/')
      changeActivePage(0)
    }
  }
}

export default backHomeListener
