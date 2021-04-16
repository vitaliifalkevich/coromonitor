import { getGlobalStatistic } from '../getGlobalStatistic'
import axios from 'axios'

jest.mock('axios')

describe('getGlobalStatistic', () => {
  const results = {
    total_cases: '123,517,177',
    new_cases: '87,720',
    total_deaths: '2,723,327',
    new_deaths: '1,824',
    total_recovered: '99,500,992',
    active_cases: '21,292,858',
    serious_critical: '90,152',
    total_cases_per_1m_population: '15,846',
    deaths_per_1m_population: '349.4',
    statistic_taken_at: '2021-03-21 09:42:01',
  }
  beforeEach(() => {
    axios.get.mockImplementation(() => Promise.resolve(results))
  })
  test('get global statistic', async () => {
    const response = await getGlobalStatistic()
    expect(response).toEqual(results)
  })
})
