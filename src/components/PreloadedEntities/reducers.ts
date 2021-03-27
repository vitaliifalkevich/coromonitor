import { IState, ICountry } from './types'
import { PayloadAction } from '@reduxjs/toolkit'

export const getAffectedCountries = (state: IState) => {
  state.countries.isLoading = true
}

export const setAffectedCountries = (
  state: IState,
  action: PayloadAction<ICountry[]>,
) => {
  state.countries.data = action.payload
  state.countries.isLoading = false
}

export const setErrorsAffectedCountries = (
  state: IState,
  action: PayloadAction<null | string>,
) => {
  state.countries.isLoading = false
  state.countries.error = action.payload
}

export const changeCurrentPage = (
  state: IState,
  action: PayloadAction<number>,
) => {
  state.currentPage = action.payload
}

export const followCountry = (
  state: IState,
  action: PayloadAction<ICountry[]>,
) => {
  return state
}

export const changeFollowCountryStatus = (
  state: IState,
  action: PayloadAction<ICountry>,
) => {
  const originalCountries = state.countries.data
  const { name, isChosen } = action.payload

  state.countries.data = originalCountries.map(country => {
    if (country.name === name) return { ...country, isChosen }
    return country
  })
}
