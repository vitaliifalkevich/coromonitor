import React from 'react'
import Subscribe from '../Subscribe'
import renderWithRouter from '__stubs__/renderWithRouter'
import { useSelector } from 'react-redux'
import { screen } from '@testing-library/react'

const mockDispatchHandler = jest
  .fn()
  .mockImplementation(action => Promise.resolve(action()))

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatchHandler,
}))

interface Setup {
  isLoading?: boolean
  mayTrial?: boolean
  withData?: boolean
  isChecked?: boolean
  error?: {
    name: string
    message: string
  } | null
}

const setup = ({
  isLoading = false,
  mayTrial = true,
  withData = true,
  isChecked = false,
  error = null,
}: Setup = {}): void => {
  const data = withData
    ? [
        {
          mItemName: 'one month',
          mItemId: 'one_month',
          mItemPrice: '3.00',
          isChecked,
        },
      ]
    : []

  const state = {
    subscription: {
      tariffsForPurchase: {
        isLoading,
        data,
        error,
      },
      purchasedTariff: {
        mayTrial,
      },
    },
  }

  useSelector.mockImplementation(selector => selector(state))
}

describe('Subscribe', () => {
  test('Subscribe success rendering with data and may trial', () => {
    setup()
    renderWithRouter(<Subscribe />)
    expect(screen.getByText(/choose period/i)).toBeInTheDocument()
    expect(screen.getByText(/free days/i)).toBeInTheDocument()
    expect(screen.getByText(/one month/i)).toBeInTheDocument()
    expect(screen.getByText(/3/i)).toBeInTheDocument()
  })

  test('Subscribe success rendering with data and not available trial', () => {
    setup({ mayTrial: false })
    renderWithRouter(<Subscribe />)
    expect(screen.getByText(/choose period/i)).toBeInTheDocument()
    expect(screen.queryByText(/free days/i)).not.toBeInTheDocument()
    expect(screen.getByText(/one month/i)).toBeInTheDocument()
    expect(screen.getByText(/3/i)).toBeInTheDocument()
  })

  test('Subscribe success rendering without data', () => {
    setup({ withData: false })
    renderWithRouter(<Subscribe />)
    expect(screen.getByText(/choose period/i)).toBeInTheDocument()
    expect(screen.queryByText(/one month/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/3/i)).not.toBeInTheDocument()
  })

  test('Subscribe loading', () => {
    setup({ isLoading: true })
    renderWithRouter(<Subscribe />)
    expect(screen.getByText(/Data is loading/i)).toBeInTheDocument()
  })

  test('Subscribe success loading with chosen tariff', () => {
    setup({ isChecked: true })
    renderWithRouter(<Subscribe />)
    expect(screen.getByText(/subscribe/i)).toBeInTheDocument()
  })

  test('Subscribe show error', async () => {
    const expectedError = {
      name: 'error name',
      message: 'error description',
    }

    setup({ error: expectedError })
    renderWithRouter(<Subscribe />)
    expect(screen.getByText(/error name/i)).toBeInTheDocument()
    expect(screen.getByText(/error description/i)).toBeInTheDocument()
  })
})
