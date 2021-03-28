const lightTheme = {
  colors: {
    buttonDefaultColor: '#2d7bec',
    buttonTextColor: '#ffffff',
  },
}

const darkTheme: Theme = {
  colors: {
    buttonDefaultColor: '#2d7bec',
    buttonTextColor: '#ffffff',
  },
}

export type Theme = typeof lightTheme

const themes = {
  light: lightTheme,
  dark: darkTheme,
}

export default themes
