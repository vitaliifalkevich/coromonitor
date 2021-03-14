import { useHistory } from 'react-router-dom'

const useBackHomeListener = () => {
  const history = useHistory()
  return (
    event: any,
    changeActivePage: (index: number) => void,
    countryName: string,
    countriesToFollow: string[],
  ) => {
    if (event.keyName === 'back') {
      if (countryName) {
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
}

export default useBackHomeListener
