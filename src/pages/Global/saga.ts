import {
  takeLatest,
  call,
  put,
  all,
  fork,
  select,
  delay,
} from 'redux-saga/effects'
import { actions } from './slice'
import { getGlobalStatistic } from 'api'
import { GlobalStaticResponse } from 'api/types'
import { IGlobalResult } from './types'
import { getGlobalStatisticResults } from './selectors'

export function* getStatistic() {
  try {
    const response: GlobalStaticResponse = yield call(getGlobalStatistic)
    if (response.status === 200) {
      yield put(actions.setGlobalStatistic(response.data))
    }
  } catch (err) {
    yield put(actions.setErrorsGlobalStatistic(err.message))
  }
}

export function* getFakeButActualStatistic() {
  const currentStatistic: IGlobalResult = yield select(
    getGlobalStatisticResults,
  )
  if (!currentStatistic) yield fork(getStatistic)
  else {
    yield delay(800)
    yield put(actions.setGlobalStatistic(currentStatistic))
  }
}

function* watchGetFakeButActualGlobalStatistic() {
  yield takeLatest(
    actions.getActualButFakeGlobalStatistic.type,
    getFakeButActualStatistic,
  )
}

function* watchGettingGlobalStatistic() {
  yield takeLatest(actions.getGlobalStatistic.type, getStatistic)
}

export default function* root() {
  yield all([
    fork(watchGetFakeButActualGlobalStatistic),
    fork(watchGettingGlobalStatistic),
  ])
}
