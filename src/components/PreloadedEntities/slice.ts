import { createSlice } from 'utils/@reduxjs/toolkit'
import { IState } from './types'
import * as reducers from './reducers'

const initialState: IState = {
  countries: {
    isLoading: false,
    data: [],
    error: null,
  },
  currentPage: 0,
}

const slice = createSlice({
  name: 'preloadedEntities',
  initialState,
  reducers,
})

export const { actions, name: keyName, reducer } = slice
