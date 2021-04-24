import React from 'react'
import InfoCases from '../InfoCases'
import renderWithRouter from '../../__stubs__/renderWithRouter'
import { useSelector } from 'react-redux'
import { screen } from '@testing-library/react'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useStore: jest.fn(),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}))

describe('InfoCases', () => {
  const state = {
    preloadedEntities: {
      countries: {
        data: [
          {
            name: 'USA',
            isChosen: true,
          },
          {
            name: 'UK',
            isChosen: true,
          },
          {
            name: 'Canada',
            isChosen: true,
          },
        ],
      },
    },
  }

  beforeEach(() => {
    useSelector.mockImplementation(selector => selector(state))
  })
  test('show info cases', () => {
    renderWithRouter(
      <InfoCases
        statisticDate="10-04-19 12:00:17"
        totalCases="10000"
        totalRecovered="9000"
        totalDeaths="10"
        countryName="USA"
      />,
    )
    expect(screen.getByText(/USA/)).toBeInTheDocument()
    expect(screen.getByText(/12:00:17/)).toBeInTheDocument()
    expect(screen.getByText(/10000/)).toBeInTheDocument()
    expect(screen.getByText(/9000/)).toBeInTheDocument()
    expect(screen.getByText('10')).toBeInTheDocument()
  })
})
