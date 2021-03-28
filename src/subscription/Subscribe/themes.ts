const lightTheme = {
  colors: {
    buttonDefaultColor: '#11376e',
    buttonActiveColor: '#2d7bec',
    borderActiveBtn: '#11376e',
    buttonTextColor: '#ffffff',
    purchaseItemBorder: '#535379',
    purchasedItemColor: '#2d7bec',
  },
}

const darkTheme: Theme = {
  colors: {
    buttonDefaultColor: '#11376e',
    buttonActiveColor: '#2d7bec',
    borderActiveBtn: '#11376e',
    buttonTextColor: '#ffffff',
    purchaseItemBorder: '#535379',
    purchasedItemColor: '#2d7bec',
  },
}

export type Theme = typeof lightTheme

const themes = {
  light: lightTheme,
  dark: darkTheme,
}

export default themes
