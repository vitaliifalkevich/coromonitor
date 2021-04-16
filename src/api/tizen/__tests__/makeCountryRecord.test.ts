import makeCountryRecord from '../makeCountryRecord'
import getDirectory from '../getDirectory'

jest.mock('../getDirectory')

const openStream = jest.fn()
const createFile = jest.fn()

const setUp = (files: Array<any>) => {
  const listFiles = jest.fn().mockImplementation((onSuccess, onError) => {
    onSuccess(files)
  })

  const directory = {
    listFiles: listFiles,
  }
  Object.defineProperty(window, 'tizen', {
    writable: true,
    value: {
      filesystem: {
        resolve: jest.fn().mockImplementation((location, onSuccess) => {
          onSuccess(directory)
        }),
      },
    },
  })
  createFile.mockImplementation(() => files[0])

  getDirectory.mockImplementation(() => ({
    listFiles: jest.fn().mockImplementation(callBack => {
      callBack(files)
    }),
    createFile: jest.fn().mockImplementation(createFile),
  }))
}

describe('makeCountryRecord', () => {
  test('make country record success to the existed file', () => {
    const files = [
      {
        name: 'file1.png',
        isFile: true,
        openStream,
      },
      {
        name: 'file2',
        isFile: false,
        openStream,
      },
      {
        name: 'chosenCountries.txt',
        isFile: true,
        openStream,
      },
    ] as Array<any>

    setUp(files)

    makeCountryRecord('USA, Canada, UK')
    expect(getDirectory).toBeCalledTimes(1)
    expect(openStream).toBeCalledTimes(1)
  })

  test('create file and make country record success', () => {
    const files = [
      {
        name: 'file1.png',
        isFile: true,
        openStream,
      },
      {
        name: 'file2',
        isFile: false,
        openStream,
      },
    ] as Array<any>

    setUp(files)

    makeCountryRecord('USA, Canada, UK')
    expect(getDirectory).toBeCalledTimes(1)
    expect(createFile).toBeCalledTimes(1)
    expect(openStream).toBeCalledTimes(1)
  })
})
