import { CommonError, ResultCallbackAvailableList } from './types'
import { ISuccess } from '../../declarations/webapis'

export function getAvailablePurchaseItems(
  returnResultCallback: ResultCallbackAvailableList,
) {
  function onsuccessCB(list: ISuccess) {
    if (list._items.length === 0) {
      returnResultCallback(null, {
        errorName: 'Empty',
        errorMsg: 'No tariffs',
      })
    } else {
      returnResultCallback(list._items)
    }
  }

  function onerrorCB(err: CommonError) {
    returnResultCallback(null, { errorName: err.name, errorMsg: err.message })
  }
  /* TODO change IAP_SUCCES_TEST_MODE to IAP_COMMERCIAL_MODE */

  window.webapis.inapppurchase.getItemList(1, 15, 'ALL', onsuccessCB, onerrorCB)
}
