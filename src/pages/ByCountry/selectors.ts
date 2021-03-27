import { createSelector } from '@reduxjs/toolkit'
import { getState } from '../../store/mainSelector'

export const getStatisticByCountryLoading = createSelector(
  [getState],
  state => state.byCountry?.isLoading,
)

export const getStatisticByCountryResults = createSelector(
  [getState],
  state => state.byCountry?.results,
)

export const getStatisticByCountryErrors = createSelector(
  [getState],
  state => state.byCountry?.error,
)
