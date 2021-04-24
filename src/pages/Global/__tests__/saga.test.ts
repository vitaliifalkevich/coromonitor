import { getFakeButActualStatistic, getStatistic } from '../saga'
import { expectSaga } from 'redux-saga-test-plan'
import { actions } from '../slice'
import { getGlobalStatistic } from 'api'
import { select } from 'redux-saga/effects'

jest.mock('api', () => ({
  getGlobalStatistic: jest.fn(),
}))

jest.mock('redux-saga/effects', () => ({
  ...jest.requireActual('redux-saga/effects'),
  select: jest.fn(),
}))

const setupGetStatisticApiMock = (
  type: 'resolve' | 'reject',
  expectedValues: any,
) => {
  getGlobalStatistic.mockImplementation(() => Promise[type](expectedValues))
}

describe('saga get global statistic', () => {
  test('test success getStatistic api', async () => {
    const dataFromApi = {
      status: 200,
      data: {
        total_cases: '146,348,573',
        new_cases: '126,535',
        total_deaths: '3,102,348',
        new_deaths: '3,400',
        total_recovered: '124,483,690',
        active_cases: '18,762,535',
        serious_critical: '109,824',
        total_cases_per_1m_population: '18,775',
        deaths_per_1m_population: '398.0',
        statistic_taken_at: '2021-04-24 13:02:01',
      },
    }

    setupGetStatisticApiMock('resolve', dataFromApi)

    await expectSaga(getStatistic)
      .call(getGlobalStatistic)
      .put(actions.setGlobalStatistic(dataFromApi.data))
      .run()
  })

  test('test error get global statistic api', async () => {
    setupGetStatisticApiMock('reject', { message: 'error' })

    await expectSaga(getStatistic)
      .call(getGlobalStatistic)
      .put(actions.setErrorsGlobalStatistic('error'))
      .run()
  })

  test('test getFakeButActualStatistic saga with empty state', async () => {
    const dataFromStore = {
      global: {
        isLoading: false,
        results: null,
        error: null,
      },
    }

    select.mockImplementation(select => select(dataFromStore))

    await expectSaga(getFakeButActualStatistic).run()
  })

  test('test getFakeButActualStatistic saga with no empty state', async () => {
    const dataFromStore = {
      global: {
        isLoading: false,
        results: {
          total_cases: '146,348,573',
          new_cases: '126,535',
          total_deaths: '3,102,348',
          new_deaths: '3,400',
          total_recovered: '124,483,690',
          active_cases: '18,762,535',
          serious_critical: '109,824',
          total_cases_per_1m_population: '18,775',
          deaths_per_1m_population: '398.0',
          statistic_taken_at: '2021-04-24 13:02:01',
        },
        error: null,
      },
    }

    select.mockImplementation(select => select(dataFromStore))

    await expectSaga(getFakeButActualStatistic)
      .delay(800)
      .put(actions.setGlobalStatistic(dataFromStore.global.results))
      .run(800)
  })
})
