import React from 'react'
import ReactDOM from 'react-dom'
import App from 'pages/App'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styles/theme/ThemeProvider'
import 'sanitize.css/sanitize.css'
import { configureAppStore } from 'store/configureStore'
import GlobalStyle from 'styles/global-styles'

const store = configureAppStore()
const MOUNT_NODE = document.getElementById('root') as HTMLElement

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider>
      <React.StrictMode>
        <>
          <App />
          <GlobalStyle />
        </>
      </React.StrictMode>
    </ThemeProvider>
  </Provider>,
  MOUNT_NODE,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
