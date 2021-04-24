import React from 'react'
import Pagination from '../Pagination'
import renderWithRouter from '__stubs__/renderWithRouter'
import { useSelector } from 'react-redux'
import { screen } from '@testing-library/react'

const mockDispatchHandler = jest
  .fn()
  .mockImplementation(action => Promise.resolve())

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useStore: jest.fn(),
  useSelector: jest.fn(),
  useDispatch: () => mockDispatchHandler,
}))

describe('Pagination', () => {
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
  test('Pagination without country name', () => {
    renderWithRouter(<Pagination />)
    expect(screen.getAllByRole('listitem')).toHaveLength(4)
  })

  test('Pagination with country name', () => {
    renderWithRouter(<Pagination countryName="USA" />)
    expect(screen.getAllByRole('listitem')).toHaveLength(4)
  })
})
