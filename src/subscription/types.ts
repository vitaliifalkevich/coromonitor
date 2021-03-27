export interface IItemForPurchaseResponse {
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

export interface IItemForPurchase extends IItemForPurchaseResponse {
  isChecked: boolean
}

export interface ISuccessPayment {
  title: string | null
  description: string | null
}

export interface IState {
  tariffsForPurchase: {
    isLoading: boolean
    data: IItemForPurchase[]
    error: null | string
  }
  purchasedTariff: {
    isLoading: boolean
    needSubscription: boolean
    mayTrial: boolean
    error: null | string
  }
  payment: {
    isLoading: boolean
    success: ISuccessPayment
    error: string | null
  }
}
