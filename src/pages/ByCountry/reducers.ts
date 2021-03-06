import { IState } from './types'
import { PayloadAction } from '@reduxjs/toolkit'
import { IResult } from './types'

export const getStatisticByCountry = (
  state: IState,
  action: PayloadAction<string>,
) => {
  state.isLoading = true
}

export const setStatisticByCountry = (
  state: IState,
  action: PayloadAction<IResult>,
) => {
  state.isLoading = false
  state.results = action.payload
}

export const setErrorsStatisticByCountry = (
  state: IState,
  action: PayloadAction<string>,
) => {
  state.isLoading = false
  state.error = action.payload
}

export const getFakeButActualStatisticByCountry = (
  state: IState,
  action: PayloadAction<string>,
) => {
  state.isLoading = true
}
