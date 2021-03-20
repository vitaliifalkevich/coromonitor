import { createSlice } from 'utils/@reduxjs/toolkit'
import { IState } from './types'
import * as reducers from './reducers'

const initialState: IState = {
  isLoading: false,
  results: null,
  errors: null,
}

const slice = createSlice({
  name: 'byCountry',
  initialState,
  reducers,
})

export const { actions, name: keyName, reducer } = slice
