import React from 'react'
import ReactDOM from 'react-dom'
import 'sanitize.css/sanitize.css'
import CheckSubscribe from 'subscription/CheckSubscription'
import { ThemeProvider } from './styles/theme/ThemeProvider'
import { Provider } from 'react-redux'
import { configureAppStore } from './store/configureStore'

const MOUNT_NODE = document.getElementById('root') as HTMLElement

const store = configureAppStore()

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider>
      <React.StrictMode>
        <CheckSubscribe />
      </React.StrictMode>
    </ThemeProvider>
  </Provider>,
  MOUNT_NODE,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
