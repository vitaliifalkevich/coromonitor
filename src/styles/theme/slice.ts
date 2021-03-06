import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit'
import { ThemeState, ThemeKeyType } from './types'
import themes from './themes'
import { RootState } from 'store/RootState'

export const initialState: ThemeState = {
  selected: 'dark',
  // getThemeFromStorage() || (isSystemDark ? 'dark' : 'light') || 'dark',
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme(state, action: PayloadAction<ThemeKeyType>) {
      state.selected = action.payload
    },
  },
})

export const selectTheme = createSelector(
  [(state: RootState) => state.theme || initialState],
  theme => {
    return themes[theme.selected]
  },
)

export const selectThemeKey = createSelector(
  [(state: RootState) => state.theme || initialState],
  theme => theme.selected,
)

export const { changeTheme } = themeSlice.actions
export const reducer = themeSlice.reducer
export const themeSliceKey = themeSlice.name
