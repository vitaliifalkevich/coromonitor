import { pay } from '../pay'

describe('pay', () => {
  test('pay success', async () => {
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
          startPayment: jest
            .fn()
            .mockImplementation(
              (itemId, paymentMode, onsuccessCB, onerrorCB) => {
                onsuccessCB(results)
              },
            ),
        },
      },
    })
    const response = await pay('item1')
    expect(response).toEqual(results)
  })

  test('catch error from pay', async () => {
    const expectedErrors = { name: 'Empty', message: 'No tariffs' }
    Object.defineProperty(window, 'webapis', {
      writable: true,
      value: {
        inapppurchase: {
          startPayment: jest
            .fn()
            .mockImplementation((subscriptionId, onsuccessCB, onerrorCB) => {
              onerrorCB(expectedErrors)
            }),
        },
      },
    })
    try {
      await pay('item1')
    } catch (err) {
      expect(err).toEqual(expectedErrors)
    }
  })
})
