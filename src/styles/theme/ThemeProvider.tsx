import React from 'react'
import { ThemeProvider as OriginalThemeProvider } from 'styled-components'
import { useSelector } from 'react-redux'
import { selectThemeKey, themeSliceKey, reducer } from './slice'
import { useInjectReducer } from 'redux-injectors'
import themes from './themes'

export const ThemeProvider = (props: { children: React.ReactChild }) => {
  useInjectReducer({ key: themeSliceKey, reducer: reducer })

  const theme = useSelector(selectThemeKey)
  return (
    <OriginalThemeProvider theme={themes[theme]}>
      {React.Children.only(props.children)}
    </OriginalThemeProvider>
  )
}
