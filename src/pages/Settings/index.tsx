import React from 'react'
import { Container, Title, CountriesList } from './styled'
import { useSelector } from 'react-redux'
import {
  getCountriesToFollowLoading,
  getCountriesToFollowError,
  getAllCountries,
  getCountriesToFollow,
} from 'components/PreloadedEntities/selectors'
import Spinner from 'components/Spinner'
import ErrorHandler from 'components/ErrorHandler'
import { ERRORS } from 'app_constants'
import ComponentThemeProvider from 'styles/theme/ComponentThemeProvider'
import themes from './themes'
import Country from './Country'
import BtnFollow from 'components/BtnFollow'
import { btnTypes } from 'app_constants'

const Settings: React.FC = () => {
  const countries = useSelector(getAllCountries)
  const isLoading = useSelector(getCountriesToFollowLoading)
  const errorMsg = useSelector(getCountriesToFollowError)
  const countriesToFollow = useSelector(getCountriesToFollow)

  return (
    <ComponentThemeProvider themes={themes}>
      <Container className="ui-page ui-page-active">
        {isLoading ? (
          <Spinner />
        ) : !errorMsg ? (
          <>
            <Title>Choose countries</Title>
            <div className="ui-content">
              <CountriesList>
                {countries.map(country => (
                  <Country key={country.name} {...country} />
                ))}
              </CountriesList>
            </div>
            {countriesToFollow.length > 0 ? (
              <BtnFollow btnType={btnTypes.follow} />
            ) : (
              <BtnFollow btnType={btnTypes.unfollow} />
            )}
          </>
        ) : (
          <ErrorHandler
            errorMsg={errorMsg}
            error={ERRORS.ERROR_DATA_FETCHING}
          />
        )}
      </Container>
    </ComponentThemeProvider>
  )
}

export default Settings
