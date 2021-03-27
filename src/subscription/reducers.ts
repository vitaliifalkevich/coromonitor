import { IState, IItemForPurchase } from './types'
import { PayloadAction } from '@reduxjs/toolkit'

export const getItemsForPurchasing = (state: IState) => {
  state.tariffsForPurchase.isLoading = true
}

export const setItemsForPurchasing = (
  state: IState,
  action: PayloadAction<IItemForPurchase[]>,
) => {
  state.tariffsForPurchase.isLoading = false
  state.tariffsForPurchase.data = action.payload
  state.tariffsForPurchase.error = null
}

export const setErrorItemsForPurchasing = (
  state: IState,
  action: PayloadAction<string>,
) => {
  state.tariffsForPurchase.isLoading = false
  state.tariffsForPurchase.error = action.payload
}

export const startPaymentProcess = (
  state: IState,
  action: PayloadAction<string>,
) => {
  state.payment.isLoading = true
}

export const successPaymentProcess = (state: IState) => {
  state.payment.isLoading = false
  state.payment.success.title = 'Success'
  state.payment.success.description = 'Your subscription is active'
  state.payment.error = null
}

export const errorPaymentProcess = (
  state: IState,
  action: PayloadAction<string>,
) => {
  state.payment.isLoading = false
  state.payment.error = action.payload
}

export const changeCheckStatusTariff = (
  state: IState,
  action: PayloadAction<string>,
) => {
  state.tariffsForPurchase.data = state.tariffsForPurchase.data.map(item => {
    if (item.mItemName === action.payload) {
      return {
        ...item,
        checked: !item.isChecked,
      }
    }
    return { ...item, checked: false }
  })
}

export const startCheckPurchased = (state: IState) => {
  state.purchasedTariff.isLoading = true
}

export const successCheckingPurchased = (
  state: IState,
  action: PayloadAction<{ needSubscription: boolean; mayTrial: boolean }>,
) => {
  state.purchasedTariff.isLoading = false
  state.purchasedTariff.needSubscription = action.payload.needSubscription
  state.purchasedTariff.mayTrial = action.payload.mayTrial
  state.purchasedTariff.error = null
}

export const errorCheckingPurchased = (
  state: IState,
  action: PayloadAction<string>,
) => {
  state.purchasedTariff.isLoading = false
  state.purchasedTariff.needSubscription = true
  state.purchasedTariff.error = action.payload
  state.purchasedTariff.mayTrial = false
}
