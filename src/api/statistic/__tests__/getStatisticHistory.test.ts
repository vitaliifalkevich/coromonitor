import getStatisticHistory from '../getStatisticHistory'
import axios from 'axios'

jest.mock('axios')

describe('getStatisticHistory', () => {
  const results = [
    {
      country_name: 'USA',
      total_cases: '31,918,591',
      new_cases: '',
      active_cases: '6,862,240',
      total_deaths: '575,829',
      new_deaths: '',
      total_recovered: '24,480,522',
      serious_critical: '9,172',
    },
  ]

  beforeEach(() => {
    axios.get.mockImplementation(() => Promise.resolve(results))
  })
  test('get global statistic', async () => {
    const response = await getStatisticHistory('USA')
    expect(response).toEqual(results)
  })
})
