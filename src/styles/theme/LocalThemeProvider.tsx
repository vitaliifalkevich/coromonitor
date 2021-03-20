import React from 'react'
import { ThemeProvider as OriginalThemeProvider } from 'styled-components'
import { useSelector } from 'react-redux'
import { selectThemeKey } from './slice'

interface ProviderProps<T> {
  children: React.ReactChild
  themes: T
}

const LocalThemeProvider = (props: ProviderProps<any>) => {
  const themeMode = useSelector(selectThemeKey)
  return (
    <OriginalThemeProvider theme={props.themes?.[themeMode]}>
      {React.Children.only(props.children)}
    </OriginalThemeProvider>
  )
}

export default LocalThemeProvider
