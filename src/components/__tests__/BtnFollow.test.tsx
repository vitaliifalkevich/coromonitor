import React from 'react'
import BtnFollow from '../BtnFollow'
import { useSelector } from 'react-redux'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import renderWithRouter from '__stubs__/renderWithRouter'

const mockDispatchHandler = jest
  .fn()
  .mockImplementation(action => Promise.resolve())

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useStore: jest.fn(),
  useSelector: jest.fn(),
  useDispatch: () => mockDispatchHandler,
}))

describe('BtnFollow', () => {
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

  test('BtnFollow onClick', async () => {
    renderWithRouter(<BtnFollow btnType="follow" />)
    expect(mockDispatchHandler).not.toBeCalled()
    await userEvent.click(screen.getByText(/follow/))
    expect(mockDispatchHandler).toBeCalledTimes(2)
  })
})
