import React from 'react'
import ErrorHandler from '../ErrorHandler'
import renderWithRouter from '__stubs__/renderWithRouter'
import { screen } from '@testing-library/react'

describe('ErrorHandler', () => {
  test('check error handler message', () => {
    renderWithRouter(
      <ErrorHandler
        error={{ message: 'error' }}
        errorMsg="error description"
      />,
    )

    expect(screen.getByText(/error/i)).toBeInTheDocument()
    expect(screen.getByText(/description/i)).toBeInTheDocument()
  })
})
