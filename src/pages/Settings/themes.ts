const lightTheme = {
  colors: {
    title: '#050539',
    listItemChecked: '#11376e',
  },
}

const darkTheme: Theme = {
  colors: {
    title: '#050539',
    listItemChecked: '#11376e',
  },
}

export type Theme = typeof lightTheme

const themes = {
  light: lightTheme,
  dark: darkTheme,
}

export default themes
