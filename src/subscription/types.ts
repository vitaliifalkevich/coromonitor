import { CommonError } from '../api/tizen/types'

export interface IItemForPurchaseResponse {
  mItemName: string
  mItemId: string
  mItemPrice: string
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
    error: null | CommonError
  }
  purchasedTariff: {
    isLoading: boolean
    haveSubscription: boolean
    mayTrial: boolean
    error: null | CommonError
  }
  payment: {
    isLoading: boolean
    success: ISuccessPayment
    error: null | CommonError
  }
}
