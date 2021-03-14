const lightTheme = {}

const darkTheme: Theme = {}

export type Theme = typeof lightTheme

export const themes = {
  light: lightTheme,
  dark: darkTheme,
}
