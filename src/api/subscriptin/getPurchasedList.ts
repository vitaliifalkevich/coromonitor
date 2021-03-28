import { CommonError } from './types'
import { ISuccess, ISuccessItem } from 'declarations/webapis'

export const getPurchasedList = (
  subscriptionId: string,
): Promise<ISuccessItem[] | CommonError> =>
  new Promise((resolve, reject) => {
    function onsuccessCB(list: ISuccess) {
      if (list._items.length === 0) {
        resolve([])
      } else {
        resolve(list._items)
      }
    }

    function onerrorCB(e: CommonError) {
      reject({ name: e.name, message: e.message })
    }

    window.webapis.inapppurchase.getPurchasedItemListByIds(
      subscriptionId,
      onsuccessCB,
      onerrorCB,
    )
  })
