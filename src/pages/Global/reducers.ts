import { PayloadAction } from '@reduxjs/toolkit'
import { IState, IGlobalResult } from './types'

export const getGlobalStatistic = (state: IState) => {
  state.isLoading = true
}

export const getActualButFakeGlobalStatistic = (state: IState) => {
  state.isLoading = true
}

export const setGlobalStatistic = (
  state: IState,
  action: PayloadAction<IGlobalResult>,
) => {
  state.isLoading = false
  state.results = action.payload
}

export const setErrorsGlobalStatistic = (
  state: IState,
  action: PayloadAction<string>,
) => {
  state.isLoading = false
  state.error = action.payload
}
