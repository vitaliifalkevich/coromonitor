import { takeLatest, call, put, fork, all } from 'redux-saga/effects'
import { actions } from './slice'
import { getAvailablePurchaseItems, getPurchasedList, pay } from 'api'
import { ISuccessItem } from '../declarations/webapis'
import { isAfter } from 'date-fns'
import config from 'config'
import { PayloadAction } from '@reduxjs/toolkit'
const { ONE_MONTH } = config

function* getItemsForPurchasing() {
  const availableTestItems = [
    {
      mItemName: '1 month',
      mItemId: 'one_month',
      mItemPrice: '3.99$',
      isChecked: false,
    },
  ]
  try {
    const itemsForPurchase: ISuccessItem[] = yield call(
      getAvailablePurchaseItems,
    )

    if (itemsForPurchase.length) {
      const preparedItems = itemsForPurchase.map(item => ({
        ...item,
        isChecked: false,
      }))

      yield put(actions.setItemsForPurchasing(preparedItems))
    }
  } catch (err) {
    if (!window.tizen) {
      yield put(actions.setItemsForPurchasing(availableTestItems))
    } else {
      yield put(actions.setErrorItemsForPurchasing(err.message))
    }
  }
}

function* checkPurchasedItem() {
  try {
    const response: ISuccessItem[] = yield call(getPurchasedList, ONE_MONTH)
    if (response.length > 0) {
      yield put(
        actions.successCheckingPurchased({
          haveSubscription: !isAfter(
            Number(response[0].mSubscriptionEndDate),
            new Date(),
          ),
          mayTrial: false,
        }),
      )
    } else
      yield put(
        actions.successCheckingPurchased({
          haveSubscription: false,
          mayTrial: true,
        }),
      )
  } catch (err) {
    if (!window.tizen) {
      yield put(
        actions.successCheckingPurchased({
          haveSubscription: false,
          mayTrial: true,
        }),
      )
    } else yield put(actions.errorCheckingPurchased(err.message))
  }
}

function* payProcess(action: PayloadAction<string>) {
  try {
    yield call(pay, action.payload)
    yield put(actions.successPaymentProcess())
    yield put(
      actions.successCheckingPurchased({
        haveSubscription: true,
        mayTrial: false,
      }),
    )
  } catch (err) {
    if (!window.tizen) {
      yield put(actions.successPaymentProcess())
      yield put(
        actions.successCheckingPurchased({
          haveSubscription: true,
          mayTrial: false,
        }),
      )
    } else {
      yield put(actions.errorPaymentProcess(err.message))
    }
  }
}

function* watchCheckPurchasedTariff() {
  yield takeLatest(actions.startCheckPurchased.type, checkPurchasedItem)
}

function* watchGettingStatisticByCountry() {
  yield takeLatest(actions.getItemsForPurchasing.type, getItemsForPurchasing)
}

function* watchPayProcess() {
  yield takeLatest(actions.startPaymentProcess.type, payProcess)
}

export default function* root() {
  yield all([
    fork(watchGettingStatisticByCountry),
    fork(watchCheckPurchasedTariff),
    fork(watchPayProcess),
  ])
}
