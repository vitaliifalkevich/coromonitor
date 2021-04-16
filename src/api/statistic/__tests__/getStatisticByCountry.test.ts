import getStatisticByCountry from '../getStatisticByCountry'
import axios from 'axios'

jest.mock('axios')

describe('getGlobalStatistic', () => {
  const results = {
    country: 'USA',
    latest_stat_by_country: [
      {
        id: '52612500',
        country_name: 'USA',
        total_cases: '30,854,944',
        new_cases: '1,912',
        active_cases: '7,018,510',
        total_deaths: '561,166',
        new_deaths: '24',
        total_recovered: '23,275,268',
        serious_critical: '8,610',
        region: null,
        total_cases_per1m: '92,817',
        record_date: '2021-03-27 13:26:01.413',
        deaths_per1m: '1,688',
        total_tests: '396,930,522',
        total_tests_per1m: '1,194,041',
        record_date_pure: '2021-03-27',
      },
    ],
  }
  beforeEach(() => {
    axios.get.mockImplementation(() => Promise.resolve(results))
  })
  test('get global statistic', async () => {
    const response = await getStatisticByCountry('USA')
    expect(response).toEqual(results)
  })
})
