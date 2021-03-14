import { TZDate } from '@types/tizen-common-web'
type IAPMode =
  | 'IAP_COMMERCIAL_MODE'
  | 'IAP_SUCCESS_TEST_MODE'
  | 'IAP_FAILURE_TEST_MODE'
type ItemType =
  | 'CONSUMABLE'
  | 'NON_CONSUMABLE'
  | 'SUBSCRIPTION'
  | 'AUTO_RECURRING_SUBSCRIPTION'
  | 'ALL'

export interface ISuccessItem {
  mItemId: string
  mItemName: string
  mItemPrice: string
  mItemPriceString: string
  mCurrencyUnit: string
  mCurrencyCode: string
  mItemDesc: string
  mItemImageUrl: string
  mItemDownloadUrl: string
  mType: string
  mPaymentId: string
  mPurchaseId: string
  mPurchaseDate: string
  mSubscriptionEndDate: string
  mJsonString: string
}

export interface ISuccess {
  mErrorCode: number
  mErrorString: string
  _items: ISuccessItem[]
}

interface InApppurchase {
  getPurchasedItemList: (
    startNumber: number,
    endNumber: number,
    startDate: TZDate,
    endDate: TZDate,
    successCallback: (response: ISuccess) => void,
    errorCallback: (JsonObject) => void,
  ) => void
  startPayment: (
    itemId: string,
    mode: IAPMode,
    successCallback: (response: ISuccess) => void,
    errorCallback: (JsonObject) => void,
  ) => void
  getItemList: (
    startNumber: number,
    endNumber: number,
    type: ItemType,
    successCallback: (response: ISuccess) => void,
    errorCallback: (JsonObject) => void,
  ) => void
  getPurchasedItemListByIds: (
    subscriptionId: string,
    successCallback: (response: ISuccess) => void,
    errorCallback: (JsonObject) => void,
  ) => void
}

interface Webapis {
  inapppurchase: InApppurchase
}
declare global {
  // eslint-disable-next-line no-unused-vars
  const webapis: Webapis
  // eslint-disable-next-line no-unused-vars
  interface Window {
    webapis: Webapis
  }
}
