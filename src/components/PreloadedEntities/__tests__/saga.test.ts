import {
  prepareAffectedCountries,
  getCountriesFromApi,
  followCountries,
  getFollowCountries,
  prepareCountriesAfterReadFromTizen,
} from '../saga'
import { expectSaga } from 'redux-saga-test-plan'
import { actions } from '../slice'
import { getAffectedCountries, makeCountryRecord, readCountries } from 'api'
import { select } from 'redux-saga/effects'

jest.mock('redux-saga/effects', () => ({
  ...jest.requireActual('redux-saga/effects'),
  select: jest.fn(),
}))

jest.mock('api', () => ({
  getAffectedCountries: jest.fn(),
  makeCountryRecord: jest.fn(),
  readCountries: jest.fn(),
}))

const setupGetAffectedCountriesApiMock = (
  type: 'resolve' | 'reject',
  expectedValues: any,
) => {
  getAffectedCountries.mockImplementation(() => Promise[type](expectedValues))
}

const setupMakeCountryRecordApiMock = (
  type: 'resolve' | 'reject',
  expectedValues: any,
) => {
  makeCountryRecord.mockImplementation(() => Promise[type](expectedValues))
}

const setupReadCountriesApiMock = (
  type: 'resolve' | 'reject',
  expectedValues: any,
) => {
  readCountries.mockImplementation(() => Promise[type](expectedValues))
}

const countriesFromState = {
  preloadedEntities: {
    countries: {
      data: [
        { name: 'USA', isChosen: true },
        { name: 'Brazil', isChosen: true },
        { name: 'UK', isChosen: true },
        { name: 'France', isChosen: false },
        { name: 'Italy', isChosen: false },
      ],
    },
  },
}

describe('PreloadedEntities saga', () => {
  test('getAffectedCountries success', async () => {
    const response = {
      status: 200,
      data: {
        affected_countries: [
          'USA',
          'Brazil',
          'India',
          'Russia',
          'UK',
          'France',
          'Italy',
          'Spain',
          'Turkey',
        ],
      },
    }

    setupGetAffectedCountriesApiMock('resolve', response)

    select.mockImplementation(select => select(countriesFromState))

    await expectSaga(getCountriesFromApi)
      .put(
        actions.setAffectedCountries(
          prepareAffectedCountries(response.data.affected_countries),
        ),
      )

      .run()
  })

  test('getAffectedCountries error', async () => {
    setupGetAffectedCountriesApiMock('reject', { message: 'error' })

    await expectSaga(getCountriesFromApi)
      .put(actions.setErrorsAffectedCountries('error'))

      .run()
  })

  test('followCountries success', async () => {
    setupMakeCountryRecordApiMock('resolve', true)
    select.mockImplementation(select => select(countriesFromState))

    await expectSaga(followCountries, {
      payload: [
        { name: 'USA', isChosen: true },
        { name: 'Brazil', isChosen: true },
      ],
      type: 'followCountries',
    }).run()
  })

  test('followCountries error', async () => {
    setupMakeCountryRecordApiMock('reject', null)
    select.mockImplementation(select => select(countriesFromState))

    await expectSaga(followCountries, {
      payload: [
        { name: 'USA', isChosen: true },
        { name: 'Brazil', isChosen: true },
      ],
      type: 'followCountries',
    }).run()
  })

  test('getFollowCountries success without countries in params', async () => {
    const responseCountriesFromTizen =
      '[{"name":"USA","isChosen":true},{"name":"Brazil","isChosen":true}]'
    setupReadCountriesApiMock('resolve', responseCountriesFromTizen)
    select.mockImplementation((select: (args: any) => void) =>
      select(countriesFromState),
    )

    const parsedCountries = JSON.parse(responseCountriesFromTizen)

    await expectSaga(getFollowCountries)
      .put(
        actions.setAffectedCountries(
          prepareCountriesAfterReadFromTizen(
            countriesFromState.preloadedEntities.countries.data,
            parsedCountries,
          ),
        ),
      )
      .run()
  })

  test('getFollowCountries error', async () => {
    const responseCountriesFromTizen =
      '[{"name":"USA","isChosen":true},{"name":"Brazil","isChosen":true}]'
    setupReadCountriesApiMock('reject', null)
    select.mockImplementation((select: (args: any) => void) =>
      select(countriesFromState),
    )

    const parsedCountries = JSON.parse(responseCountriesFromTizen)

    await expectSaga(getFollowCountries)
      .put(
        actions.setAffectedCountries(
          prepareCountriesAfterReadFromTizen(
            countriesFromState.preloadedEntities.countries.data,
            parsedCountries,
          ),
        ),
      )
      .run()
  })
})
