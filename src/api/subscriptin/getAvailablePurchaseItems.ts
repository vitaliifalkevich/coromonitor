import { CommonError } from './types'
import { ISuccess } from '../../declarations/webapis'

export const getAvailablePurchaseItems = () =>
  new Promise((resolve, reject) => {
    function onsuccessCB(list: ISuccess) {
      if (list._items.length === 0) {
        reject({
          errorName: 'Empty',
          errorMsg: 'No tariffs',
        })
      } else {
        resolve(list._items)
      }
    }

    function onerrorCB(err: CommonError) {
      reject({ errorName: err.name, errorMsg: err.message })
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
