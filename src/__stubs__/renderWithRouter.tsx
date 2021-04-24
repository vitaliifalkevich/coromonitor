import React, { FC, ReactElement } from 'react'
import { createMemoryHistory, MemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { render } from '@testing-library/react'
import themes from '../styles/theme/themes'
import { ThemeProvider } from 'styled-components'

interface IRenderWithRouter {
  route?: string
  history?: MemoryHistory
}
const renderWithRouter = (
  component: ReactElement,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
  }: IRenderWithRouter = {},
) => {
  const Wrapper: FC = ({ children }) => (
    <ThemeProvider theme={themes['dark']}>
      <Router history={history}>{children}</Router>
    </ThemeProvider>
  )
  return {
    ...render(component, { wrapper: Wrapper }),
    history,
  }
}

export default renderWithRouter
