import { ResultCallbackPurchasedList, CommonError } from './types'
import { ISuccess } from 'declarations/webapis'

export function getPurchasedList(
  returnResultCallback: ResultCallbackPurchasedList,
  subscriptionId: string,
) {
  function onsuccessCB(list: ISuccess) {
    if (list._items.length === 0) {
      returnResultCallback([])
    } else {
      returnResultCallback(list._items)
    }
  }

  function onerrorCB(e: CommonError) {
    returnResultCallback(null, { errorName: e.name, errorMsg: e.message })
  }

  window.webapis.inapppurchase.getPurchasedItemListByIds(
    subscriptionId,
    onsuccessCB,
    onerrorCB,
  )
}
