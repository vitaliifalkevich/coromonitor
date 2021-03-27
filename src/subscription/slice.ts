import { createSlice } from 'utils/@reduxjs/toolkit'
import { IState } from './types'
import * as reducers from './reducers'

const initialState: IState = {
  tariffsForPurchase: {
    isLoading: false,
    data: [],
    error: null,
  },
  purchasedTariff: {
    isLoading: false,
    needSubscription: true,
    mayTrial: false,
    error: null,
  },
  payment: {
    isLoading: false,
    success: {
      title: null,
      description: null,
    },
    error: null,
  },
}

const slice = createSlice({
  name: 'subscription',
  initialState,
  reducers,
})

export const { actions, name: keyName, reducer } = slice
