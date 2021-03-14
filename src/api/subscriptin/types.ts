import { ISuccessItem, ISuccess } from 'declarations/webapis'

export interface CommonError {
  name: string
  message: string
}

export interface NoPurchasedError {
  errorName: string
  errorMsg: string
}

export type ResultCallbackAvailableList = (
  items: ISuccessItem[] | null,
  error?: NoPurchasedError,
) => void

export type ResultCallbackPurchasedList = (
  items: ISuccessItem[] | null,
  error?: NoPurchasedError,
) => void

export type ResultCallbackPay = (
  items: ISuccess | null,
  error?: NoPurchasedError,
) => void
