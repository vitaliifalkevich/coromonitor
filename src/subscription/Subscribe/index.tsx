import React, { useCallback, useMemo } from 'react'
import Logo from 'components/Logo'
import Spinner from 'components/Spinner'
import AlertSubscription from '../AlertSubscription'
import {
  PayButton,
  SubscriptionExpired,
  ItemsForPurchase,
  Item,
  PurchasedTitle,
  Price,
} from './styled'
import LocalThemeProvider from 'styles/theme/LocalThemeProvider'
import themes from './themes'
import { useDispatch, useSelector } from 'react-redux'
import {
  checkMayTrialPeriod,
  getAvailableTariffsError,
  getAvailableTariffsLoading,
  getAvailableTariffs,
} from '../selectors'
import { actions } from '../slice'

const Subscribe: React.FC = () => {
  const isTariffsLoading = useSelector(getAvailableTariffsLoading)
  const isTariffsError = useSelector(getAvailableTariffsError)
  const mayTrial = useSelector(checkMayTrialPeriod)
  const itemsToPurchase = useSelector(getAvailableTariffs)

  const chosenTariff = useMemo(
    () =>
      itemsToPurchase &&
      itemsToPurchase.filter(item => item.isChecked).map(item => item.mItemId),

    [itemsToPurchase],
  )

  const dispatch = useDispatch()

  const checkPurchased = useCallback(() => {
    dispatch(actions.startCheckPurchased())
  }, [dispatch])

  const getPay = useCallback(() => {
    chosenTariff && dispatch(actions.startPaymentProcess(chosenTariff[0]))
  }, [dispatch, chosenTariff])

  const onChangeStatus = useCallback(
    tariffName => {
      dispatch(actions.changeCheckStatusTariff(tariffName))
    },
    [dispatch],
  )

  return (
    <LocalThemeProvider themes={themes}>
      <div className="ui-page ui-page-active">
        <Logo />
        {isTariffsLoading ? (
          <Spinner />
        ) : isTariffsError ? (
          <AlertSubscription
            alertName={isTariffsError.name}
            alertMsg={isTariffsError.message}
            dispatchAction={checkPurchased}
          />
        ) : (
          <>
            <h2>Choose period</h2>
            {mayTrial && (
              <SubscriptionExpired>and get 7 free days</SubscriptionExpired>
            )}
            <ItemsForPurchase>
              {itemsToPurchase &&
                itemsToPurchase.map((item, idx) => (
                  <Item
                    key={idx}
                    isChecked={item.isChecked}
                    onClick={() => {
                      onChangeStatus(item.mItemName)
                    }}
                  >
                    <PurchasedTitle>{item.mItemName}</PurchasedTitle>
                    <Price>{item.mItemPrice}</Price>
                  </Item>
                ))}
            </ItemsForPurchase>
            {chosenTariff && chosenTariff.length > 0 && (
              <PayButton onClick={getPay} />
            )}
          </>
        )}
      </div>
    </LocalThemeProvider>
  )
}

export default Subscribe
