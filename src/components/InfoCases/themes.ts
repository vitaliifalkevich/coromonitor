const lightTheme = {
  colors: {
    confirmed: '#f7de0f',
    recovered: '#bcfb59',
    deaths: '#ff0808',
  },
}

const darkTheme: Theme = {
  colors: {
    confirmed: '#f7de0f',
    recovered: '#bcfb59',
    deaths: '#ff0808',
  },
}

export type Theme = typeof lightTheme

const themes = {
  light: lightTheme,
  dark: darkTheme,
}

export default themes
