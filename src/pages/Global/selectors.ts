import { createSelector } from '@reduxjs/toolkit'
import { getState } from '../../store/mainSelector'

export const getGlobalStatisticLoading = createSelector(
  [getState],
  state => state.global?.isLoading,
)

export const getGlobalStatisticResults = createSelector(
  [getState],
  state => state.global?.results,
)

export const getGlobalStatisticErrors = createSelector(
  [getState],
  state => state.global?.error,
)
