import { takeLatest, call, put, all, fork } from 'redux-saga/effects'
import { actions } from './slice'
import { getAffectedCountries, makeCountryRecord, readCountries } from 'api'
import { AffectedCountriesResponse } from 'api/types'
import { PayloadAction } from '@reduxjs/toolkit'
import { ICountry } from './types'

function* getCountries() {
  try {
    const affectedResponse: AffectedCountriesResponse = yield call(
      getAffectedCountries,
    )

    // const followedCountries: string = yield call(readCountries)

    if (affectedResponse.status === 200) {
      yield put(
        actions.setAffectedCountries(affectedResponse.data.affected_countries),
      )
    }
  } catch (err) {
    yield put(actions.setErrorsAffectedCountries(err.message))
  }
}

function* followCountries(action: PayloadAction<ICountry[]>) {
  const countries = action.payload
}

// watchers
function* watchFollowCountry() {
  yield takeLatest(actions.followCountry.type, followCountries)
}

function* watchGetAffectedCountries() {
  yield takeLatest(actions.getAffectedCountries.type, getCountries)
}

export default function* root() {
  yield all([fork(watchFollowCountry), fork(watchGetAffectedCountries)])
}
