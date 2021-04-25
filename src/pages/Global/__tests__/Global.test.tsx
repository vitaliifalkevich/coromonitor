import React from 'react'
import Global from '../index'
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

interface SetupData {
  withCountriesToFollow?: boolean
  withResults?: boolean
  isLoading?: boolean
  error?: null | string
}

const setupState = ({
  withCountriesToFollow = true,
  withResults = true,
  isLoading = false,
  error = null,
}: SetupData = {}): void => {
  const countries = withCountriesToFollow
    ? [
        { name: 'USA', isChosen: true },
        { name: 'UK', isChosen: true },
        { name: 'Canada', isChosen: true },
      ]
    : [{ name: 'USA' }, { name: 'UK' }, { name: 'Canada' }]

  const results = withResults
    ? {
        total_cases: '146,348,573',
        new_cases: '126,535',
        total_deaths: '3,102,348',
        new_deaths: '3,400',
        total_recovered: '124,483,690',
        active_cases: '18,762,535',
        serious_critical: '109,824',
        total_cases_per_1m_population: '18,775',
        deaths_per_1m_population: '398.0',
        statistic_taken_at: '2021-04-24 13:02:01',
      }
    : null
  const state = {
    preloadedEntities: {
      countries: { data: countries },
    },
    global: {
      isLoading,
      results,
      error,
    },
  }
  useSelector.mockImplementation(selector => selector(state))
}

describe('Global static rendering', () => {
  test('Global success rendering with data', async () => {
    setupState()
    await renderWithRouter(<Global />)
    expect(screen.getByText(/Globally/i)).toBeInTheDocument()
    expect(screen.getByText(/USA/i)).toBeInTheDocument()
    expect(screen.getByText(/01:02:01/i)).toBeInTheDocument()
    expect(screen.getByText(/conf/i)).toBeInTheDocument()
    expect(screen.getByText(/146,348,573/i)).toBeInTheDocument()
    expect(screen.getByText(/rec/i)).toBeInTheDocument()
    expect(screen.getByText(/124,483,690/i)).toBeInTheDocument()
    expect(screen.getByText(/deaths/i)).toBeInTheDocument()
    expect(screen.getByText(/3,102,348/i)).toBeInTheDocument()
    expect(screen.getAllByRole('button')).toHaveLength(2)
  })

  test('Global success rendering without data', async () => {
    setupState({ withResults: false })
    await renderWithRouter(<Global />)
    expect(screen.getByText(/Global/i)).toBeInTheDocument()
    expect(screen.getByText(/USA/i)).toBeInTheDocument()
    expect(screen.queryByText(/01:02:01/i)).not.toBeInTheDocument()
    expect(screen.getByText(/conf/i)).toBeInTheDocument()
    expect(screen.queryByText(/146,348,573/i)).not.toBeInTheDocument()
    expect(screen.getByText(/rec/i)).toBeInTheDocument()
    expect(screen.queryByText(/124,483,690/i)).not.toBeInTheDocument()
    expect(screen.getByText(/deaths/i)).toBeInTheDocument()
    expect(screen.queryByText(/3,102,348/i)).not.toBeInTheDocument()
    expect(screen.getAllByRole('button')).toHaveLength(2)
  })

  test('Global success rendering without countries to follow', async () => {
    setupState({ withCountriesToFollow: false })
    await renderWithRouter(<Global />)
    expect(screen.queryByText(/USA/i)).not.toBeInTheDocument()
  })

  test('Global success rendering isLoading', async () => {
    setupState({ isLoading: true })
    await renderWithRouter(<Global />)
    expect(screen.queryByText(/global/i)).not.toBeInTheDocument()
    expect(screen.getByText(/USA/i)).toBeInTheDocument()
    expect(screen.getByText(/Data is loading/i)).toBeInTheDocument()
  })

  test('Global error rendering isLoading', async () => {
    setupState({ error: 'error' })
    await renderWithRouter(<Global />)
    expect(screen.queryByText(/global/i)).not.toBeInTheDocument()
    expect(screen.getByText(/USA/i)).toBeInTheDocument()
    expect(screen.getByText(/error/i)).toBeInTheDocument()
  })
})

describe('Global events', () => {
  test('navigate between countries', async () => {
    setupState()
    await renderWithRouter(<Global />)

    await userEvent.click(screen.getByText(/usa/i))
    expect(mockPushHistory.mock.calls[0][0]).toBe('/country/USA')

    expect(mockDispatchHandler).toBeCalledTimes(2)
  })

  test('update statistic', async () => {
    setupState()
    await renderWithRouter(<Global />)

    await userEvent.dblClick(screen.getByText(/global/i))
    expect(mockDispatchHandler).toBeCalledTimes(2)

    await userEvent.dblClick(screen.getByText(/global/i))
    expect(mockDispatchHandler).toBeCalledTimes(3)
  })
})
