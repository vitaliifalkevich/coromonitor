import {
  takeLatest,
  call,
  put,
  select,
  fork,
  delay,
  all,
} from 'redux-saga/effects'
import { actions } from './slice'
import { getStatisticByCountry } from 'api'
import { StaticByCountryResponse } from 'api/types'
import { PayloadAction } from '@reduxjs/toolkit'
import { IResult } from './types'
import { getStatisticByCountryResults } from './selectors'

export function* getStatistic(action: PayloadAction<string>) {
  const countryName = action.payload
  try {
    const response: StaticByCountryResponse = yield call(
      getStatisticByCountry,
      countryName,
    )
    if (response.status === 200) {
      yield put(
        actions.setStatisticByCountry(
          response.data?.latest_stat_by_country?.[0],
        ),
      )
    }
  } catch (err) {
    yield put(actions.setErrorsStatisticByCountry(err.message))
  }
}

export function* getFakeButActualStatistic(action: PayloadAction<string>) {
  const currentStatistic: IResult = yield select(getStatisticByCountryResults)
  if (!currentStatistic) yield fork(getStatistic, action)
  else {
    yield delay(800)
    yield put(actions.setStatisticByCountry(currentStatistic))
  }
}
function* watchGetFakeButActualStatistic() {
  yield takeLatest(
    actions.getFakeButActualStatisticByCountry.type,
    getFakeButActualStatistic,
  )
}

function* watchGettingStatisticByCountry() {
  yield takeLatest(actions.getStatisticByCountry.type, getStatistic)
}

export default function* root() {
  yield all([
    fork(watchGettingStatisticByCountry),
    fork(watchGetFakeButActualStatistic),
  ])
}
