import { getAvailablePurchaseItems } from '../getAvailablePurchaseItems'

describe('getAvailablePurchaseItems', () => {
  test('get available purchase items success', async () => {
    const results = {
      _items: [
        {
          mItemId: 'item1',
          mItemName: 'item1',
          mItemPrice: '5',
          mItemPriceString: '5',
          mCurrencyUnit: '50',
          mCurrencyCode: 'item1',
          mItemDesc: 'description',
          mItemImageUrl: 'imageUrl',
          mItemDownloadUrl: 'imageUrl1',
          mType: 'all',
          mPaymentId: 'item1',
          mPurchaseId: 'item1',
          mPurchaseDate: '4/12/2021',
          mSubscriptionEndDate: '4/12/2021',
          mJsonString: 'string',
        },
      ],
    }
    Object.defineProperty(window, 'webapis', {
      writable: true,
      value: {
        inapppurchase: {
          getItemList: jest
            .fn()
            .mockImplementation(
              (startNumber, endNumber, type, onsuccessCB, onerrorCB) => {
                onsuccessCB(results)
              },
            ),
        },
      },
    })
    const response = await getAvailablePurchaseItems()
    expect(response).toEqual(results._items)
  })
  test('get empty available purchase items', async () => {
    const results = {
      _items: [],
    }
    const expectedErrors = { name: 'Empty', message: 'No tariffs' }
    Object.defineProperty(window, 'webapis', {
      writable: true,
      value: {
        inapppurchase: {
          getItemList: jest
            .fn()
            .mockImplementation(
              (startNumber, endNumber, type, onsuccessCB, onerrorCB) => {
                onsuccessCB(results)
              },
            ),
        },
      },
    })

    try {
      await getAvailablePurchaseItems()
    } catch (err) {
      expect(err).toEqual(expectedErrors)
    }
  })
  test('catch error from purchase items', async () => {
    const expectedErrors = { name: 'errorName', message: 'Error message' }
    Object.defineProperty(window, 'webapis', {
      writable: true,
      value: {
        inapppurchase: {
          getItemList: jest
            .fn()
            .mockImplementation(
              (startNumber, endNumber, type, onsuccessCB, onerrorCB) => {
                onerrorCB(expectedErrors)
              },
            ),
        },
      },
    })

    try {
      await getAvailablePurchaseItems()
    } catch (err) {
      expect(err).toEqual(expectedErrors)
    }
  })
})
