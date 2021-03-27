const lightTheme = {
  colors: {
    buttonDefaultColor: '#11376e',
    buttonActiveColor: '#2d7bec',
    borderActiveBtn: '#11376e',
    buttonTextColor: '#ffffff',
  },
}

const darkTheme: Theme = {
  colors: {
    buttonDefaultColor: '#11376e',
    buttonActiveColor: '#2d7bec',
    borderActiveBtn: '#11376e',
    buttonTextColor: '#ffffff',
  },
}

export type Theme = typeof lightTheme

const themes = {
  light: lightTheme,
  dark: darkTheme,
}

export default themes
