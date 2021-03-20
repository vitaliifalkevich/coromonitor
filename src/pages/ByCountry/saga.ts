import { takeLatest, call, put } from 'redux-saga/effects'
import { actions } from './slice'
import { getStatisticByCountry } from 'api'
import { StaticByCountryResponse } from 'api/types'
import { PayloadAction } from '@reduxjs/toolkit'

function* getStatistic(action: PayloadAction<string>) {
  const countryName = action.payload
  try {
    const response: StaticByCountryResponse = yield call(
      getStatisticByCountry,
      countryName,
    )
    if (response.status === 200) {
      yield put(actions.setStatisticByCountry(response.data))
    }
  } catch (err) {
    yield put(actions.setErrorsStatisticByCountry(err.message))
  }
}

function* saga() {
  yield takeLatest(actions.getStatisticByCountry.type, getStatistic)
}

export default saga
