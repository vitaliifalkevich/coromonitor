const lightTheme = {
  fonts: {
    extraBold: 'Qanelas ExtraBold, serif',
    regular: 'Qanelas Regular, serif',
  },
  mode: 'light',
}

const darkTheme: Theme = {
  fonts: {
    extraBold: 'Qanelas ExtraBold, serif',
    regular: 'Qanelas Regular, serif',
  },
  mode: 'dark',
}

export type Theme = typeof lightTheme

const themes = {
  light: lightTheme,
  dark: darkTheme,
}

export default themes
