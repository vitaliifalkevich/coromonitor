import { getPurchasedList } from '../getPurchasedList'

describe('getPurchasedList', () => {
  test('get purchased items by ids', async () => {
    const results = {
      _items: [
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
          mPurchaseDate: '4/12/2021',
          mSubscriptionEndDate: '5/12/2021',
          mJsonString: 'item1',
        },
      ],
    }
    Object.defineProperty(window, 'webapis', {
      writable: true,
      value: {
        inapppurchase: {
          getPurchasedItemListByIds: jest
            .fn()
            .mockImplementation((subscriptionId, onsuccessCB, onerrorCB) => {
              onsuccessCB(results)
            }),
        },
      },
    })
    const response = await getPurchasedList('item1')
    expect(response).toEqual(results._items)
  })

  test('get empty purchased items by ids', async () => {
    const results = {
      _items: [],
    }
    Object.defineProperty(window, 'webapis', {
      writable: true,
      value: {
        inapppurchase: {
          getPurchasedItemListByIds: jest
            .fn()
            .mockImplementation((subscriptionId, onsuccessCB, onerrorCB) => {
              onsuccessCB(results)
            }),
        },
      },
    })
    const response = await getPurchasedList('item1')
    expect(response).toEqual(results._items)
  })

  test('catch error from getPurchasedList', async () => {
    const expectedErrors = { name: 'Empty', message: 'No tariffs' }
    Object.defineProperty(window, 'webapis', {
      writable: true,
      value: {
        inapppurchase: {
          getPurchasedItemListByIds: jest
            .fn()
            .mockImplementation((subscriptionId, onsuccessCB, onerrorCB) => {
              onerrorCB(expectedErrors)
            }),
        },
      },
    })
    try {
      await getPurchasedList('item1')
    } catch (err) {
      expect(err).toEqual(expectedErrors)
    }
  })
})
