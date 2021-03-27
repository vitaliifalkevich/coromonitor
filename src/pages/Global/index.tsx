import React, { useEffect, useState } from 'react'
import { keyName, actions, reducer } from './slice'
import saga from './saga'
import { useInjectReducer, useInjectSaga } from 'redux-injectors'
import { useSelector, useDispatch } from 'react-redux'
import {
  getGlobalStatisticLoading,
  getGlobalStatisticResults,
  getGlobalStatisticErrors,
} from './selectors'
import { appExit } from 'helpers'
import Pagination from 'components/Pagination'
import Logo from 'components/Logo'
import Spinner from 'components/Spinner'
import ErrorHandler from 'components/ErrorHandler'
import BtnNavigate from 'components/BtnNavigate'
import { getCountriesToFollow } from '../../components/PreloadedEntities/selectors'
import { ERRORS, btnTypes } from 'app_constants'
import InfoCases from 'components/InfoCases'
import { useDoubleTap } from 'use-double-tap'
import { differenceInSeconds } from 'date-fns'
import config from 'config'
const { LIMIT_REQUEST_TIME } = config

const Global: React.FC = () => {
  useInjectReducer({ key: keyName, reducer })
  useInjectSaga({ key: keyName, saga })
  const dispatch = useDispatch()
  const [limitState, setLimitState] = useState<Date | null>(null)

  const results = useSelector(getGlobalStatisticResults)
  const isLoading = useSelector(getGlobalStatisticLoading)
  const errorMsg = useSelector(getGlobalStatisticErrors)
  const countriesToFollow = useSelector(getCountriesToFollow)

  useEffect(() => {
    dispatch(actions.getGlobalStatistic())
  }, [dispatch])

  useEffect(() => {
    window.addEventListener('tizenhwkey', appExit, { passive: true })
    return () => {
      window.removeEventListener('tizenhwkey', appExit)
    }
  }, [])

  const onDoubleTap = useDoubleTap(() => {
    if (!limitState) {
      setLimitState(new Date())
      dispatch(actions.getGlobalStatistic())
    } else {
      let compare = differenceInSeconds(new Date(), limitState)
      if (compare > LIMIT_REQUEST_TIME) {
        dispatch(actions.getGlobalStatistic())
        setLimitState(null)
      } else {
        dispatch(actions.getActualButFakeGlobalStatistic())
      }
    }
  })

  return (
    <div className="ui-page ui-page-active" {...onDoubleTap}>
      <Pagination />
      <Logo />
      {isLoading ? (
        <Spinner />
      ) : !errorMsg ? (
        <InfoCases
          statisticDate={results?.statistic_taken_at}
          totalCases={results?.total_cases}
          totalRecovered={results?.total_recovered}
          totalDeaths={results?.total_deaths}
        />
      ) : (
        <ErrorHandler errorMsg={errorMsg} error={ERRORS.ERROR_DATA_FETCHING} />
      )}
      {countriesToFollow.length > 0 && (
        <BtnNavigate
          btnType={btnTypes.next}
          countryName={countriesToFollow[0].name}
        />
      )}
    </div>
  )
}

export default Global
