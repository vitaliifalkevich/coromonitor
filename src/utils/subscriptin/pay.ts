import { ResultCallbackPay, CommonError } from './types'
import { IAPMode, ISuccess } from 'declarations/webapis'

export function pay(
  itemId: string,
  returnResultCallback: ResultCallbackPay,
  paymentMode: IAPMode = 'IAP_SUCCESS_TEST_MODE',
) {
  function onsuccessCB(item: ISuccess) {
    returnResultCallback(item)
  }

  function onerrorCB(err: CommonError) {
    returnResultCallback(null, { errorName: err.name, errorMsg: err.message })
  }

  /* TODO change IAP_SUCCES_TEST_MODE to IAP_COMMERCIAL_MODE */

  try {
    window.webapis.inapppurchase.startPayment(
      itemId,
      paymentMode,
      onsuccessCB,
      onerrorCB,
    )
  } catch (e) {
    returnResultCallback(null, { errorName: e.name, errorMsg: e.message })
  }
}
