import React from 'react'
import TrialScreenOrExpired from '../TrialScreenOrExpired'
import renderWithRouter from '__stubs__/renderWithRouter'
import { useSelector } from 'react-redux'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const mockPushHistory = jest.fn().mockImplementation(path => path)

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockPushHistory,
  }),
}))

jest.mock('redux-injectors', () => ({
  useInjectReducer: jest.fn(),
  useInjectSaga: jest.fn(),
}))

const mockDispatchHandler = jest
  .fn()
  .mockImplementation(action => Promise.resolve(action()))

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useStore: jest.fn(),
  useSelector: jest.fn(),
  useDispatch: () => mockDispatchHandler,
}))

interface Setup {
  isLoading?: boolean
  mayTrial?: boolean
  error?: {
    name: string
    message: string
  } | null
}

const setup = ({
  isLoading = false,
  mayTrial = true,
  error = null,
}: Setup = {}): void => {
  const state = {
    subscription: {
      purchasedTariff: {
        mayTrial,
        isLoading,
        error,
      },
    },
  }
  useSelector.mockImplementation(selector => selector(state))
}

describe('TrialScreenOrExpired', () => {
  test('TrialScreenOrExpired success rendering with trial availability', () => {
    setup()
    renderWithRouter(<TrialScreenOrExpired />)
    expect(screen.getByText(/subscribe/i)).toBeInTheDocument()
    expect(screen.getByText(/start trial/i)).toBeInTheDocument()
  })

  test('TrialScreenOrExpired success rendering without trial availability', () => {
    setup({ mayTrial: false })
    renderWithRouter(<TrialScreenOrExpired />)
    expect(screen.getByText(/trial period expired/i)).toBeInTheDocument()
    expect(
      screen.getByText(/subscribe to use all functions/i),
    ).toBeInTheDocument()
    expect(screen.queryByText(/start trial/i)).not.toBeInTheDocument()
  })

  test('TrialScreenOrExpired loading', () => {
    setup({ isLoading: true })
    renderWithRouter(<TrialScreenOrExpired />)
    expect(screen.getByText(/Data is loading/i)).toBeInTheDocument()
  })

  test('TrialScreenOrExpired click subscribe', async () => {
    setup()
    renderWithRouter(<TrialScreenOrExpired />)
    await userEvent.click(screen.getByText(/subscribe/i))
    expect(mockPushHistory.mock.calls[0][0]).toBe('subscribe')
  })

  test('TrialScreenOrExpired click subscribe trial', async () => {
    setup()
    renderWithRouter(<TrialScreenOrExpired />)
    await userEvent.click(screen.getByText(/subscribe/i))
    expect(mockPushHistory.mock.calls[0][0]).toBe('subscribe')
  })

  test('TrialScreenOrExpired show error', async () => {
    const expectedError = {
      name: 'error name',
      message: 'error description',
    }
    setup({ error: expectedError })
    renderWithRouter(<TrialScreenOrExpired />)
    expect(screen.getByText(/error name/i)).toBeInTheDocument()
    expect(screen.getByText(/error description/i)).toBeInTheDocument()
  })
})
