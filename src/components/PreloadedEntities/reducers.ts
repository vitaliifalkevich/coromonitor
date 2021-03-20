import { IState, ICountry } from './types'
import { PayloadAction } from '@reduxjs/toolkit'
import { prepareCountries } from './normalization'

export const getAffectedCountries = (state: IState) => {
  state.countries.isLoading = true
}

export const setAffectedCountries = (
  state: IState,
  action: PayloadAction<string[]>,
) => {
  state.countries.data = prepareCountries(action.payload)
  state.countries.isLoading = false
}

export const setErrorsAffectedCountries = (
  state: IState,
  action: PayloadAction<string[] | string>,
) => {
  state.countries.isLoading = false
  state.countries.errors = action.payload
}

export const setCountChosenCountries = (
  state: IState,
  action: PayloadAction<number>,
) => {
  state.countChosenCountries = action.payload
}

export const changeCurrentPage = (
  state: IState,
  action: PayloadAction<number>,
) => {
  state.currentPage = action.payload
}

export const followCountry = (
  state: IState,
  payload: PayloadAction<ICountry[]>,
) => {
  return state
}
