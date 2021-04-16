import React, { useEffect, useCallback } from 'react'
import { appExit } from 'helpers'
import { useDoubleTap } from 'use-double-tap'
import Logo from 'components/Logo'
import Spinner from 'components/Spinner'
import { actions } from '../slice'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  checkMayTrialPeriod,
  getPurchaseTariffError,
  getPurchaseTariffLoading,
} from '../selectors'
import AlertSubscription from '../AlertSubscription'
import {
  SubscribeNavigate,
  SubscriptionExpired,
  Or,
  TrialNavigate,
} from './styled'
import themes from './themes'
import ComponentThemeProvider from 'styles/theme/ComponentThemeProvider'
import { useInjectReducer, useInjectSaga } from 'redux-injectors'
import { keyName, reducer } from '../slice'
import saga from '../saga'

const TrialScreenOrExpired: React.FC = () => {
  useInjectReducer({ key: keyName, reducer })
  useInjectSaga({ key: keyName, saga })

  const dispatch = useDispatch()
  const history = useHistory()
  const isLoadingPurchased = useSelector(getPurchaseTariffLoading)
  const errorPurchased = useSelector(getPurchaseTariffError)
  const mayTrial = useSelector(checkMayTrialPeriod)

  useEffect(() => {
    window.addEventListener('tizenhwkey', appExit, { passive: true })
    return () => {
      window.removeEventListener('tizenhwkey', appExit)
    }
  }, [])

  const checkPurchased = useCallback(() => {
    dispatch(actions.startCheckPurchased())
  }, [dispatch])

  const onDoubleTap = useDoubleTap(() => {
    checkPurchased()
  })

  const onBtnClickHandle = useCallback(() => {
    history.push('subscribe')
  }, [history])

  return (
    <ComponentThemeProvider themes={themes}>
      <div className="ui-page ui-page-active" {...onDoubleTap}>
        <Logo />
        {isLoadingPurchased ? (
          <Spinner />
        ) : errorPurchased ? (
          <AlertSubscription
            alertName={errorPurchased.name}
            alertMsg={errorPurchased.message}
            dispatchAction={checkPurchased}
          />
        ) : (
          <>
            {!mayTrial && <h2>Trial period expired</h2>}
            <SubscribeNavigate onClick={onBtnClickHandle}>
              Subscribe
            </SubscribeNavigate>
            {!mayTrial && (
              <SubscriptionExpired>
                Please, subscribe to use all functions <br /> of the application
              </SubscriptionExpired>
            )}
            {mayTrial && <Or> or </Or>}
            {mayTrial && (
              <TrialNavigate onClick={onBtnClickHandle}>
                Start trial 7 days
              </TrialNavigate>
            )}
          </>
        )}
      </div>
    </ComponentThemeProvider>
  )
}

export default TrialScreenOrExpired
