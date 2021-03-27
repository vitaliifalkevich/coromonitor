import React, { useEffect, useState } from 'react'
import { useInjectReducer, useInjectSaga } from 'redux-injectors'
import { useSelector, useDispatch } from 'react-redux'
import { keyName, reducer, actions } from './slice'
import saga from './saga'
import { useParams } from 'react-router-dom'
import {
  getStatisticByCountryErrors,
  getStatisticByCountryLoading,
  getStatisticByCountryResults,
} from './selectors'
import { appExit } from '../../helpers'
import { useDoubleTap } from 'use-double-tap'
import { differenceInSeconds } from 'date-fns'
import config from '../../config'
import Pagination from '../../components/Pagination'
import Logo from '../../components/Logo'
import BtnNavigate from '../../components/BtnNavigate'
import { btnTypes, ERRORS } from '../../app_constants'
import Spinner from '../../components/Spinner'
import InfoCases from '../../components/InfoCases'
import ErrorHandler from '../../components/ErrorHandler'
import {
  getCountriesToFollow,
  getCurrentPage,
} from '../../components/PreloadedEntities/selectors'
const { LIMIT_REQUEST_TIME } = config

const ByCountry: React.FC = () => {
  useInjectReducer({ key: keyName, reducer })
  useInjectSaga({ key: keyName, saga })
  const { countryName } = useParams<{ countryName: string }>()
  const dispatch = useDispatch()
  const [limitState, setLimitState] = useState<Date | null>(null)
  const results = useSelector(getStatisticByCountryResults)
  const isLoading = useSelector(getStatisticByCountryLoading)
  const errorMsg = useSelector(getStatisticByCountryErrors)
  const countriesToFollow = useSelector(getCountriesToFollow)
  const currentPage = useSelector(getCurrentPage)

  useEffect(() => {
    dispatch(actions.getStatisticByCountry(countryName))
  }, [dispatch, countryName])

  useEffect(() => {
    window.addEventListener('tizenhwkey', appExit, { passive: true })
    return () => {
      window.removeEventListener('tizenhwkey', appExit)
    }
  }, [])

  const onDoubleTap = useDoubleTap(() => {
    if (!limitState) {
      setLimitState(new Date())
      dispatch(actions.getStatisticByCountry(countryName))
    } else {
      let compare = differenceInSeconds(new Date(), limitState)
      if (compare > LIMIT_REQUEST_TIME) {
        dispatch(actions.getStatisticByCountry(countryName))
        setLimitState(null)
      } else {
        dispatch(actions.getFakeButActualStatisticByCountry(countryName))
      }
    }
  })

  return (
    <div className="ui-page ui-page-active" {...onDoubleTap}>
      <Pagination countryName={countryName} />
      <Logo />

      {countriesToFollow.length > 0 && (
        <BtnNavigate
          btnType={btnTypes.prev}
          countryName={countriesToFollow[currentPage - 1]?.name}
        />
      )}

      {isLoading ? (
        <Spinner />
      ) : !errorMsg ? (
        <InfoCases
          statisticDate={results?.record_date}
          totalCases={results?.total_cases}
          totalRecovered={results?.total_recovered}
          totalDeaths={results?.total_deaths}
          countryName={countryName}
        />
      ) : (
        <ErrorHandler errorMsg={errorMsg} error={ERRORS.ERROR_DATA_FETCHING} />
      )}

      {countriesToFollow.length > 1 &&
        countriesToFollow.length > currentPage + 1 && (
          <BtnNavigate
            btnType={btnTypes.next}
            countryName={countriesToFollow[currentPage + 1]?.name}
          />
        )}
    </div>
  )
}

export default ByCountry
