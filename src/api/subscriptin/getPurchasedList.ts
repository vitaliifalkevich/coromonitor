import { CommonError } from './types'
import { ISuccess } from 'declarations/webapis'

export const getPurchasedList = (subscriptionId: string) =>
  new Promise((resolve, reject) => {
    function onsuccessCB(list: ISuccess) {
      if (list._items.length === 0) {
        resolve([])
      } else {
        resolve(list._items)
      }
    }

    function onerrorCB(e: CommonError) {
      reject({ errorName: e.name, errorMsg: e.message })
    }

    window.webapis.inapppurchase.getPurchasedItemListByIds(
      subscriptionId,
      onsuccessCB,
      onerrorCB,
    )
  })
