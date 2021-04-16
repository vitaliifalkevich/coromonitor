import getAffectedCountries from '../getAffectedCountries'
import axios from 'axios'

jest.mock('axios')

describe('getAffectedCountries', () => {
  const results = {
    affected_countries: ['USA', 'Brazil', 'India', 'Russia'],
  }
  beforeEach(() => {
    axios.get.mockImplementation(() => Promise.resolve(results))
  })
  test('get list of affected countries', async () => {
    const response = await getAffectedCountries()
    expect(response).toEqual(results)
  })
})
