import { createSelector } from '@reduxjs/toolkit'
import { getState } from 'store/mainSelector'

export const checkHaveSubscription = createSelector(
  [getState],
  state => state.subscription?.purchasedTariff.haveSubscription,
)

export const checkMayTrialPeriod = createSelector(
  [getState],
  state => state.subscription?.purchasedTariff.mayTrial,
)

export const getPurchaseTariffLoading = createSelector(
  [getState],
  state => state.subscription?.purchasedTariff.isLoading,
)

export const getPurchaseTariffError = createSelector(
  [getState],
  state => state.subscription?.purchasedTariff.error,
)

export const getAvailableTariffs = createSelector(
  [getState],
  state => state.subscription?.tariffsForPurchase.data,
)

export const getAvailableTariffsLoading = createSelector(
  [getState],
  state => state.subscription?.tariffsForPurchase.isLoading,
)

export const getAvailableTariffsError = createSelector(
  [getState],
  state => state.subscription?.tariffsForPurchase.error,
)

export const getPaymentIsLoading = createSelector(
  [getState],
  state => state.subscription?.payment.isLoading,
)

export const getPaymentError = createSelector(
  [getState],
  state => state.subscription?.payment.error,
)

export const getPaymentSuccess = createSelector(
  [getState],
  state => state.subscription?.payment.success,
)
