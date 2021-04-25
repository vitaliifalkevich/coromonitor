import React from 'react'
import AlertSubscription from '../AlertSubscription'
import renderWithRouter from '__stubs__/renderWithRouter'
import { screen } from '@testing-library/react'
import { useSelector } from 'react-redux'

const dispatchAction = jest.fn()
const mockPushHistory = jest.fn().mockImplementation(path => path)

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockPushHistory,
  }),
}))

describe('AlertSubscription', () => {
  beforeEach(() => {
    useSelector.mockImplementation(selector => selector({}))
  })
  test('AlertSubscription success rendering and show info', () => {
    const props = {
      alertName: 'alert name',
      alertMsg: 'message',
      dispatchAction,
    }
    renderWithRouter(<AlertSubscription {...props} />)
    expect(screen.getByText(/alert name/i)).toBeInTheDocument()
    expect(screen.getByText(/message/i)).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})
