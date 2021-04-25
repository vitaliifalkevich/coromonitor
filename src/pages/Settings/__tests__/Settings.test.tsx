import React from 'react'
import Settings from '../index'
import renderWithRouter from '__stubs__/renderWithRouter'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useSelector } from 'react-redux'

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
  withChosenCountries?: boolean
  withCountries?: boolean
}

const setup = ({
  withChosenCountries = true,
  withCountries = true,
}: Setup = {}): void => {
  const countries = withChosenCountries
    ? [
        { name: 'USA', isChosen: true },
        { name: 'UK', isChosen: true },
        { name: 'Canada', isChosen: true },
      ]
    : [{ name: 'USA' }, { name: 'UK' }, { name: 'Canada' }]
  const state = {
    preloadedEntities: {
      countries: {
        data: withCountries ? countries : [],
      },
    },
  }

  useSelector.mockImplementation(selector => selector(state))
}

describe('Settings static rendering', () => {
  test('Settings success rendering countries', async () => {
    setup()
    await renderWithRouter(<Settings />)
    expect(screen.getByText(/choose countries/i)).toBeInTheDocument()
    expect(screen.getByText(/USA/i)).toBeInTheDocument()
    expect(screen.getByText(/UK/i)).toBeInTheDocument()
    expect(screen.getByText(/follow/i)).toBeInTheDocument()
  })

  test('Settings success rendering countries without choosing', async () => {
    setup({ withChosenCountries: false })
    await renderWithRouter(<Settings />)
    expect(screen.getByText(/choose countries/i)).toBeInTheDocument()
    expect(screen.getByText(/USA/i)).toBeInTheDocument()
    expect(screen.getByText(/UK/i)).toBeInTheDocument()
    expect(screen.getByText(/unfollow/i)).toBeInTheDocument()
    expect(screen.queryByText('follow')).not.toBeInTheDocument()
  })

  test('Settings success rendering without countries', async () => {
    setup({ withCountries: false })
    await renderWithRouter(<Settings />)
    expect(screen.getByText(/choose countries/i)).toBeInTheDocument()
    expect(screen.queryByText(/USA/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/UK/i)).not.toBeInTheDocument()
  })

  test('Settings click on the country', async () => {
    const expectedValue = { name: 'USA', isChosen: false }
    setup()
    await renderWithRouter(<Settings />)
    userEvent.click(screen.getByText(/USA/i))
    expect(mockDispatchHandler.mock.calls[0][0].payload).toEqual(expectedValue)
  })
})
