import { takeLatest, call, put, all, fork, select } from 'redux-saga/effects'
import { actions } from './slice'
import { getAffectedCountries, makeCountryRecord, readCountries } from 'api'
import { AffectedCountriesResponse } from 'api/types'
import { PayloadAction } from '@reduxjs/toolkit'
import { ICountry } from './types'
import { getAllCountries } from './selectors'

function* getFollowCountries() {
  const affectedCountries: ICountry[] = yield select(getAllCountries)

  const prepareCountries = (
    countries: ICountry[],
    followCountries: ICountry[],
  ) =>
    countries.map(country => {
      if (followCountries.find(item => item.name === country.name))
        return {
          ...country,
          isChosen: true,
        }
      return country
    })

  try {
    const result: string = yield call(readCountries)
    const followedCountries = JSON.parse(result)

    yield put(
      actions.setAffectedCountries(
        prepareCountries(affectedCountries, followedCountries),
      ),
    )
  } catch (err) {
    console.log('tizen api does not works in browser')
    const result =
      '[{"name":"USA","isChosen":true},{"name":"Brazil","isChosen":true}]'
    const followedCountries = JSON.parse(result)

    yield put(
      actions.setAffectedCountries(
        prepareCountries(affectedCountries, followedCountries),
      ),
    )
  }
}

function* getCountriesFromApi() {
  const prepareCountries = (countries: string[]): ICountry[] => {
    return countries.map(country => ({
      name: country,
      isChosen: false,
    }))
  }
  try {
    const affectedResponse: AffectedCountriesResponse = yield call(
      getAffectedCountries,
    )

    if (affectedResponse.status === 200) {
      yield put(
        actions.setAffectedCountries(
          prepareCountries(affectedResponse.data.affected_countries),
        ),
      )
      yield fork(getFollowCountries)
    }
  } catch (err) {
    yield put(actions.setErrorsAffectedCountries(err.message))
  }
}

function* followCountries(action: PayloadAction<ICountry[]>) {
  const countries = action.payload
  const countriesSerialized = JSON.stringify(countries)
  try {
    yield call(() => makeCountryRecord(countriesSerialized))
  } catch (err) {
    console.log('tizen api does not works in browser')
    console.log('serialized countries ', countriesSerialized)
  }

  yield fork(getFollowCountries)
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
