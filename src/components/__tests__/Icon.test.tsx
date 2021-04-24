import React from 'react'
import Icon from '../Icon'
import renderWithRouter from '__stubs__/renderWithRouter'
import userEvent from '@testing-library/user-event'
import { screen } from '@testing-library/react'
import { useSelector } from 'react-redux'

const mockDispatchHandler = jest
  .fn()
  .mockImplementation(action => Promise.resolve())

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useStore: jest.fn(),
  useSelector: jest.fn(),
  useDispatch: () => mockDispatchHandler,
}))

describe('Icon', () => {
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
  test('icon type statistic', async () => {
    renderWithRouter(<Icon iconType="trash" />)
    expect(mockDispatchHandler).not.toBeCalled()
    await userEvent.click(screen.getByRole(/button/i))
    expect(mockDispatchHandler).toBeCalledTimes(2)
  })
})
