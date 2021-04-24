import { getStatistic, getFakeButActualStatistic } from '../saga'
import { expectSaga } from 'redux-saga-test-plan'
import { actions } from '../slice'
import { getStatisticByCountry } from 'api'
import { select } from 'redux-saga/effects'

jest.mock('api', () => ({
  getStatisticByCountry: jest.fn(),
}))

jest.mock('redux-saga/effects', () => ({
  ...jest.requireActual('redux-saga/effects'),
  select: jest.fn(),
}))

const setupGetStatisticByCountryApiMock = (
  type: 'resolve' | 'reject',
  expectedValues: any,
) => {
  getStatisticByCountry.mockImplementation(() => Promise[type](expectedValues))
}

describe('saga statistic by country', () => {
  test('test success getStatisticByCountry api', async () => {
    const dataFromApi = {
      status: 200,
      data: {
        country: 'USA',
        latest_stat_by_country: [
          {
            id: '56933271',
            country_name: 'USA',
            total_cases: '32,735,704',
            new_cases: '',
            active_cases: '6,854,582',
            total_deaths: '585,075',
            new_deaths: '',
            total_recovered: '25,296,047',
            serious_critical: '9,832',
            region: null,
            total_cases_per1m: '98,431',
            record_date: '2021-04-24 02:52:01.263',
            deaths_per1m: '1,759',
            total_tests: '437,068,081',
            total_tests_per1m: '1,314,196',
            record_date_pure: '2021-04-24',
          },
        ],
      },
    }

    setupGetStatisticByCountryApiMock('resolve', dataFromApi)

    await expectSaga(getStatistic, {
      payload: 'USA',
      type: 'getStatistic',
    })
      .call(getStatisticByCountry, 'USA')
      .put(
        actions.setStatisticByCountry(
          dataFromApi.data.latest_stat_by_country[0],
        ),
      )
      .run()
  })

  test('test error getStatisticByCountry api', async () => {
    setupGetStatisticByCountryApiMock('reject', { message: 'error' })

    await expectSaga(getStatistic, {
      payload: 'USA',
      type: 'getStatistic',
    })
      .call(getStatisticByCountry, 'USA')
      .put(actions.setErrorsStatisticByCountry('error'))
      .run()
  })

  test('test getFakeButActualStatistic saga with empty state', async () => {
    const dataFromStore = {
      byCountry: {
        isLoading: false,
        results: null,
        error: null,
      },
    }

    select.mockImplementation(select => select(dataFromStore))

    await expectSaga(getFakeButActualStatistic, {
      payload: 'USA',
      type: 'getStatistic',
    }).run()
  })

  test('test getFakeButActualStatistic saga with no empty state', async () => {
    const dataFromStore = {
      byCountry: {
        isLoading: false,
        results: {
          active_cases: '6,854,582',
          country_name: 'USA',
          deaths_per1m: '1,759',
          id: '56933271',
          new_cases: '',
          new_deaths: '',
          record_date: '2021-04-24 02:52:01.263',
          record_date_pure: '2021-04-24',
          region: null,
          serious_critical: '9,832',
          total_cases: '32,735,704',
          total_cases_per1m: '98,431',
          total_deaths: '585,075',
          total_recovered: '25,296,047',
          total_tests: '437,068,081',
          total_tests_per1m: '1,314,196',
        },
        error: null,
      },
    }

    select.mockImplementation(select => select(dataFromStore))

    await expectSaga(getFakeButActualStatistic, {
      payload: 'USA',
      type: 'getStatistic',
    })
      .delay(800)
      .put(actions.setStatisticByCountry(dataFromStore.byCountry.results))
      .run(800)
  })
})
