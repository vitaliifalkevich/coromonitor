import { getState } from '../../store/mainSelector'
import { createSelector } from '@reduxjs/toolkit'

export const getCountriesToFollow = createSelector([getState], state =>
  state.preloadedEntities.countries.data.filter(country => country.isChosen),
)

export const getAllCountries = createSelector(
  [getState],
  state => state.preloadedEntities.countries.data,
)

export const getCountriesToFollowLoading = createSelector(
  [getState],
  state => state.preloadedEntities.countries.isLoading,
)

export const getCountriesToFollowError = createSelector(
  [getState],
  state => state.preloadedEntities.countries.error,
)

export const getCurrentPage = createSelector(
  [getState],
  state => state.preloadedEntities?.currentPage,
)
