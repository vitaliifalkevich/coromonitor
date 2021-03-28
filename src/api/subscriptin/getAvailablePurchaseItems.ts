import { CommonError } from './types'
import { ISuccess, ISuccessItem } from '../../declarations/webapis'

export const getAvailablePurchaseItems = (): Promise<
  ISuccessItem[] | CommonError
> =>
  new Promise((resolve, reject) => {
    function onsuccessCB(list: ISuccess) {
      if (list._items.length === 0) {
        reject({
          name: 'Empty',
          message: 'No tariffs',
        })
      } else {
        resolve(list._items)
      }
    }

    function onerrorCB(err: CommonError) {
      reject({ name: err.name, message: err.message })
    }
    /* TODO change IAP_SUCCES_TEST_MODE to IAP_COMMERCIAL_MODE */

    window.webapis.inapppurchase.getItemList(
      1,
      15,
      'ALL',
      onsuccessCB,
      onerrorCB,
    )
  })
