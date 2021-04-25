import React from 'react'
import ByCountry from '../index'
import renderWithRouter from '__stubs__/renderWithRouter'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const mockPushHistory = jest.fn().mockImplementation(path => path)

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
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
  withDataByCountry?: boolean
  isLoading?: boolean
  error?: null | string
  currentPage?: number
}

const setupState = ({
  withCountriesToFollow = true,
  withDataByCountry = true,
  isLoading = false,
  error = null,
  currentPage = 0,
}: SetupData = {}): void => {
  const countries = withCountriesToFollow
    ? [
        { name: 'USA', isChosen: true },
        { name: 'UK', isChosen: true },
        { name: 'Canada', isChosen: true },
      ]
    : [{ name: 'USA' }, { name: 'UK' }, { name: 'Canada' }]

  const dataByCountry = withDataByCountry
    ? {
        id: '56933271',
        country_name: 'USA',
        total_cases: '32,735,704',
        new_cases: '',
        active_cases: '6,854,582',
        total_deaths: '585,075',
        new_deaths: '',
        total_recovered: '25,296,047',
        serious_critical: '9,832',
        region: null,
        total_cases_per1m: '98,431',
        record_date: '2021-04-24 02:52:01.263',
        deaths_per1m: '1,759',
        total_tests: '437,068,081',
        total_tests_per1m: '1,314,196',
        record_date_pure: '2021-04-24',
      }
    : null
  const state = {
    preloadedEntities: {
      countries: { data: countries },
      currentPage,
    },
    byCountry: {
      isLoading,
      results: dataByCountry,
      error,
    },
  }
  useSelector.mockImplementation(selector => selector(state))
}

describe('ByCountry static rendering', () => {
  beforeEach(() => {
    useParams.mockImplementation(() => ({
      countryName: 'USA',
    }))
  })

  test('ByCountry success rendering with data', async () => {
    setupState()
    await renderWithRouter(<ByCountry />)
    expect(screen.getByText(/Global/i)).toBeInTheDocument()
    expect(screen.getByText(/UK/i)).toBeInTheDocument()
    expect(screen.getByText(/USA/i)).toBeInTheDocument()
    expect(screen.getByText(/02:52:01/i)).toBeInTheDocument()
    expect(screen.getByText(/conf/i)).toBeInTheDocument()
    expect(screen.getByText(/32,735,704/i)).toBeInTheDocument()
    expect(screen.getByText(/rec/i)).toBeInTheDocument()
    expect(screen.getByText(/25,296,047/i)).toBeInTheDocument()
    expect(screen.getByText(/deaths/i)).toBeInTheDocument()
    expect(screen.getByText(/585,075/i)).toBeInTheDocument()
    expect(screen.getAllByRole('button')).toHaveLength(4)
  })

  test('ByCountry success rendering without data', async () => {
    setupState({ withDataByCountry: false })
    await renderWithRouter(<ByCountry />)
    expect(screen.getByText(/Global/i)).toBeInTheDocument()
    expect(screen.getByText(/UK/i)).toBeInTheDocument()
    expect(screen.queryByText(/02:52:01/i)).not.toBeInTheDocument()
    expect(screen.getByText(/conf/i)).toBeInTheDocument()
    expect(screen.queryByText(/32,735,704/i)).not.toBeInTheDocument()
    expect(screen.getByText(/rec/i)).toBeInTheDocument()
    expect(screen.queryByText(/25,296,047/i)).not.toBeInTheDocument()
    expect(screen.getByText(/deaths/i)).toBeInTheDocument()
    expect(screen.queryByText(/585,075/i)).not.toBeInTheDocument()
    expect(screen.getAllByRole('button')).toHaveLength(4)
  })

  test('ByCountry success rendering without countries to follow', async () => {
    setupState({ withCountriesToFollow: false })
    await renderWithRouter(<ByCountry />)
    expect(screen.queryByText(/Global/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/UK/i)).not.toBeInTheDocument()
  })

  test('ByCountry success rendering current page 1', async () => {
    setupState({ currentPage: 1 })
    await renderWithRouter(<ByCountry />)
    expect(screen.getAllByText(/USA/i)).toHaveLength(2)
    expect(screen.getByText(/Canada/i)).toBeInTheDocument()
  })

  test('ByCountry success rendering isLoading', async () => {
    setupState({ isLoading: true })
    await renderWithRouter(<ByCountry />)
    expect(screen.getByText(/global/i)).toBeInTheDocument()
    expect(screen.getByText(/UK/i)).toBeInTheDocument()
    expect(screen.getByText(/Data is loading/i)).toBeInTheDocument()
  })

  test('ByCountry error rendering isLoading', async () => {
    setupState({ error: 'error' })
    await renderWithRouter(<ByCountry />)
    expect(screen.getByText(/global/i)).toBeInTheDocument()
    expect(screen.getByText(/UK/i)).toBeInTheDocument()
    expect(screen.getByText(/error/i)).toBeInTheDocument()
  })
})

describe('ByCountry events', () => {
  beforeEach(() => {
    useParams.mockImplementation(() => ({
      countryName: 'USA',
    }))
  })

  test('navigate between countries', async () => {
    setupState()
    await renderWithRouter(<ByCountry />)

    await userEvent.click(screen.getByText(/global/i))
    expect(mockPushHistory.mock.calls[0][0]).toBe('/')

    await userEvent.click(screen.getByText(/UK/i))
    expect(mockPushHistory.mock.calls[1][0]).toBe('/country/UK')
    expect(mockDispatchHandler).toBeCalledTimes(4)
  })

  test('update statistic', async () => {
    setupState()
    await renderWithRouter(<ByCountry />)

    await userEvent.dblClick(screen.getByText(/USA/i))
    expect(mockDispatchHandler).toBeCalledTimes(2)

    await userEvent.dblClick(screen.getByText(/USA/i))
    expect(mockDispatchHandler).toBeCalledTimes(3)
  })
})
