import { createGlobalStyle } from 'styled-components'
import background from 'assets/img/bg.png'

const GlobalStyle = createGlobalStyle`
html,
body {
  height: 100%;
  width: 100%;
  line-height: 1.5;
  font-family: 'Qanelas ExtraBold';
  overflow: hidden;
}
b {
 font-family: 'Qanelas ExtraBold', serif;
}
h2 {
  font-size: 0.65em;
  text-align: center;
  position: absolute;
  width: 9em;
  left: 50%;
  margin-left: -4.5em;
  margin-top: 5.1em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ui-page {
  background: url(${background}) center center no-repeat;
  width: 360px!important;
  margin: 0 auto;
  height: 360px!important;
  position: relative;
  border-radius: 50%;
  .ui-content {
   width: 106%;
  }

}
`

export default GlobalStyle
