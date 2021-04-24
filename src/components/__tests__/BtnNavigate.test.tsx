import React from 'react'
import BtnNavigate from '../BtnNavigate'
import renderWithRouter from '__stubs__/renderWithRouter'
import { useSelector } from 'react-redux'
import userEvent from '@testing-library/user-event'
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

describe('BtnNavigate', () => {
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
  test('btn navigate onClick with countryName title', async () => {
    renderWithRouter(<BtnNavigate btnType="prev" countryName="USA" />)

    expect(mockDispatchHandler).not.toBeCalled()
    await userEvent.click(screen.getByText(/USA/))
    expect(mockDispatchHandler).toBeCalledTimes(1)
  })

  test('btn navigate onClick without country name', async () => {
    renderWithRouter(<BtnNavigate btnType="prev" />)

    expect(mockDispatchHandler).not.toBeCalled()
    await userEvent.click(screen.getByText(/global/i))
    expect(mockDispatchHandler).toBeCalledTimes(1)
  })
})
