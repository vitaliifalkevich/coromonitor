import { CommonError } from './types'
import { IAPMode, ISuccess } from 'declarations/webapis'

export const pay = (
  itemId: string,
  paymentMode: IAPMode = 'IAP_SUCCESS_TEST_MODE',
): Promise<ISuccess | CommonError> =>
  new Promise((resolve, reject) => {
    function onsuccessCB(item: ISuccess) {
      resolve(item)
    }

    function onerrorCB(err: CommonError) {
      reject({ name: err.name, message: err.message })
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
      reject({ errorName: e.name, errorMsg: e.message })
    }
  })
