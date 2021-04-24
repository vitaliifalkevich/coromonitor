import { getItemsForPurchasing, checkPurchasedItem, payProcess } from '../saga'
import { expectSaga } from 'redux-saga-test-plan'
import { actions } from '../slice'
import { getAvailablePurchaseItems, getPurchasedList, pay } from 'api'
import config from 'config'
import MockDate from 'mockdate'
const { ONE_MONTH } = config

jest.mock('api', () => ({
  getAvailablePurchaseItems: jest.fn(),
  getPurchasedList: jest.fn(),
  pay: jest.fn(),
}))

const setupGetAvailablePurchaseItemsApi = (
  type: 'resolve' | 'reject',
  expectedValues: any,
) => {
  getAvailablePurchaseItems.mockImplementation(() =>
    Promise[type](expectedValues),
  )
}

const setupGetPurchasedListApi = (
  type: 'resolve' | 'reject',
  expectedValues: any,
) => {
  getPurchasedList.mockImplementation(() => Promise[type](expectedValues))
}

const setupPayApi = (type: 'resolve' | 'reject', expectedValues: any) => {
  pay.mockImplementation(() => Promise[type](expectedValues))
}

describe('getItemsForPurchasing', () => {
  test('getItemsForPurchasing success case', async () => {
    const dataFromApi = [
      {
        mItemName: '1 month',
        mItemId: 'one_month',
        mItemPrice: '3.99$',
      },
    ]
    setupGetAvailablePurchaseItemsApi('resolve', dataFromApi)

    const preparedItemsForStore = dataFromApi.map(item => ({
      ...item,
      isChecked: false,
    }))

    await expectSaga(getItemsForPurchasing)
      .call(getAvailablePurchaseItems)
      .put(actions.setItemsForPurchasing(preparedItemsForStore))
      .run()
  })

  test('getItemsForPurchasing error (tizen api is not found)', async () => {
    const preparedItemsForStore = [
      {
        mItemName: '1 month',
        mItemId: 'one_month',
        mItemPrice: '3.99$',
        isChecked: false,
      },
    ]
    setupGetAvailablePurchaseItemsApi('reject', null)

    await expectSaga(getItemsForPurchasing)
      .call(getAvailablePurchaseItems)
      .put(actions.setItemsForPurchasing(preparedItemsForStore))
      .run()
  })
})

describe('checkPurchasedItem', () => {
  beforeAll(() => {
    MockDate.set(
      'Fri Apr 23 2021 12:25:39 GMT+0000 (Coordinated Universal Time)',
    )
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('checkPurchasedItem success with an active subscription', async () => {
    const dataFromApi = [
      {
        mItemId: 'item1',
        mItemName: 'item1',
        mItemPrice: '5',
        mItemPriceString: '5',
        mCurrencyUnit: '50',
        mCurrencyCode: 'USD',
        mItemDesc: 'Description',
        mItemImageUrl: 'image',
        mItemDownloadUrl: 'itemDownloadLik',
        mType: 'ALL',
        mPaymentId: 'item1',
        mPurchaseId: 'item1',
        mPurchaseDate: '3/24/2021',
        mSubscriptionEndDate: '4/24/2021',
        mJsonString: 'item1',
      },
    ]

    setupGetPurchasedListApi('resolve', dataFromApi)

    await expectSaga(checkPurchasedItem)
      .call(getPurchasedList, ONE_MONTH)
      .put(
        actions.successCheckingPurchased({
          haveSubscription: true,
          mayTrial: false,
        }),
      )
      .run()
  })

  test('checkPurchasedItem success with an expired subscription', async () => {
    const dataFromApi = [
      {
        mItemId: 'item1',
        mItemName: 'item1',
        mItemPrice: '5',
        mItemPriceString: '5',
        mCurrencyUnit: '50',
        mCurrencyCode: 'USD',
        mItemDesc: 'Description',
        mItemImageUrl: 'image',
        mItemDownloadUrl: 'itemDownloadLik',
        mType: 'ALL',
        mPaymentId: 'item1',
        mPurchaseId: 'item1',
        mPurchaseDate: '3/20/2021',
        mSubscriptionEndDate: '4/20/2021',
        mJsonString: 'item1',
      },
    ]

    setupGetPurchasedListApi('resolve', dataFromApi)

    await expectSaga(checkPurchasedItem)
      .call(getPurchasedList, ONE_MONTH)
      .put(
        actions.successCheckingPurchased({
          haveSubscription: false,
          mayTrial: false,
        }),
      )
      .run()
  })

  test('checkPurchasedItem success without subscription', async () => {
    setupGetPurchasedListApi('resolve', null)

    await expectSaga(checkPurchasedItem)
      .call(getPurchasedList, ONE_MONTH)
      .put(
        actions.successCheckingPurchased({
          haveSubscription: false,
          mayTrial: true,
        }),
      )
      .run()
  })

  test('checkPurchasedItem error (tizen api is not found)', async () => {
    setupGetPurchasedListApi('reject', null)

    await expectSaga(checkPurchasedItem)
      .call(getPurchasedList, ONE_MONTH)
      .put(
        actions.successCheckingPurchased({
          haveSubscription: false,
          mayTrial: true,
        }),
      )
      .run()
  })
})

describe('pay process', () => {
  test('pay success', async () => {
    setupPayApi('resolve', null)

    await expectSaga(payProcess, { payload: 'item1', type: 'pay' })
      .call(pay, 'item1')
      .put(actions.successPaymentProcess())
      .put(
        actions.successCheckingPurchased({
          haveSubscription: true,
          mayTrial: false,
        }),
      )
      .run()
  })

  test('pay error (tizen is not found)', async () => {
    setupPayApi('reject', null)

    await expectSaga(payProcess, { payload: 'item1', type: 'pay' })
      .call(pay, 'item1')
      .put(actions.successPaymentProcess())
      .put(
        actions.successCheckingPurchased({
          haveSubscription: true,
          mayTrial: false,
        }),
      )
      .run()
  })
})

describe('tests error from tizen api', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'tizen', {
      writable: true,
      value: {},
    })
  })

  afterAll(() => {
    window.tizen = undefined
  })

  test('getItemsForPurchasing error', async () => {
    const responseFromApi = {
      message: 'error',
      name: 'error',
    }
    setupGetAvailablePurchaseItemsApi('reject', responseFromApi)

    await expectSaga(getItemsForPurchasing)
      .call(getAvailablePurchaseItems)
      .put(actions.setErrorItemsForPurchasing(responseFromApi))
      .run()
  })

  test('checkPurchasedItem error', async () => {
    const responseFromApi = {
      message: 'error',
      name: 'error',
    }
    setupGetPurchasedListApi('reject', responseFromApi)

    await expectSaga(checkPurchasedItem)
      .call(getPurchasedList, ONE_MONTH)
      .put(actions.errorCheckingPurchased(responseFromApi))
      .run()
  })

  test('pay error', async () => {
    const expectedError = {
      name: 'error',
      message: 'could not pay',
    }

    setupPayApi('reject', expectedError)

    await expectSaga(payProcess, { payload: 'item1', type: 'pay' })
      .call(pay, 'item1')
      .put(actions.errorPaymentProcess(expectedError))
      .run()
  })
})
