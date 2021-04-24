import { takeLatest, call, put, all, fork, select } from 'redux-saga/effects'
import { actions } from './slice'
import { getAffectedCountries, makeCountryRecord, readCountries } from 'api'
import { AffectedCountriesResponse } from 'api/types'
import { PayloadAction } from '@reduxjs/toolkit'
import { ICountry } from './types'
import { getAllCountries } from './selectors'

export const prepareAffectedCountries = (countries: string[]): ICountry[] => {
  return countries.map(country => ({
    name: country,
    isChosen: false,
  }))
}

export const prepareCountriesAfterReadFromTizen = (
  countries: ICountry[],
  followCountries: ICountry[],
) =>
  countries.map(country => {
    if (followCountries.find(item => item.name === country.name))
      return {
        ...country,
        isChosen: true,
      }
    return {
      ...country,
      isChosen: false,
    }
  })

export function* getFollowCountries(countries?: ICountry[]) {
  const affectedCountries: ICountry[] = yield select(getAllCountries)

  try {
    const result: string = yield call(readCountries)
    const followedCountries = JSON.parse(result)

    yield put(
      actions.setAffectedCountries(
        prepareCountriesAfterReadFromTizen(
          affectedCountries,
          followedCountries,
        ),
      ),
    )
  } catch (err) {
    // tizen api does not works in browser
    const result =
      '[{"name":"USA","isChosen":true},{"name":"Brazil","isChosen":true}]'
    const followedCountries = countries ? countries : JSON.parse(result)

    yield put(
      actions.setAffectedCountries(
        prepareCountriesAfterReadFromTizen(
          affectedCountries,
          followedCountries,
        ),
      ),
    )
  }
}

export function* getCountriesFromApi() {
  try {
    const affectedResponse: AffectedCountriesResponse = yield call(
      getAffectedCountries,
    )

    if (affectedResponse.status === 200) {
      yield put(
        actions.setAffectedCountries(
          prepareAffectedCountries(affectedResponse.data.affected_countries),
        ),
      )
      yield fork(getFollowCountries)
    }
  } catch (err) {
    yield put(actions.setErrorsAffectedCountries(err.message))
  }
}

export function* followCountries(action: PayloadAction<ICountry[]>) {
  const countries = action.payload
  const countriesSerialized = JSON.stringify(countries)
  try {
    yield call(() => makeCountryRecord(countriesSerialized))
    yield fork(getFollowCountries)
  } catch (err) {
    yield fork(getFollowCountries, countries)
  }
}

// watchers
function* watchFollowCountry() {
  yield takeLatest(actions.followCountry.type, followCountries)
}

function* watchGetAffectedCountries() {
  yield takeLatest(actions.getAffectedCountries.type, getCountriesFromApi)
}

export default function* root() {
  yield all([fork(watchFollowCountry), fork(watchGetAffectedCountries)])
}
