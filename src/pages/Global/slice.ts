import { createSlice } from 'utils/@reduxjs/toolkit'
import { IState } from './types'
import * as reducers from './reducers'

const initialState: IState = {
  isLoading: false,
  results: null,
  error: null,
}

const slice = createSlice({
  name: 'global',
  initialState,
  reducers,
})

export const { actions, name: keyName, reducer } = slice
