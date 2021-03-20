import { getState } from '../../store/mainSelector'
import { createSelector } from '@reduxjs/toolkit'

export const getCountriesToFollow = createSelector([getState], state =>
  state.preloadedEntities.countries.data.filter(country => country.isChosen),
)

export const getCurrentPage = createSelector(
  [getState],
  state => state.preloadedEntities?.currentPage,
)
