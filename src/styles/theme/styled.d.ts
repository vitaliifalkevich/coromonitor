import 'styled-components'

/* This is the suggested way of declaring theme types */
declare module 'styled-components' {
  export interface DefaultTheme<T> extends object {
    theme: T
  }
}
