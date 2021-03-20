const lightTheme = {
  colors: {
    paginationDot: '#FFFFFF',
  },
}

const darkTheme: Theme = {
  colors: {
    paginationDot: '#FFFFFF',
  },
}

export type Theme = typeof lightTheme

const themes = {
  light: lightTheme,
  dark: darkTheme,
}

export default themes
