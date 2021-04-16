import readCountries from '../readCountries'
import { File } from 'tizen-common-web'

const openStream = jest.fn()

const setUp = (files: Array<any>, isFile: boolean = true) => {
  const listFiles = jest.fn().mockImplementation((onSuccess, onError) => {
    onSuccess(files)
  })
  function resolve(location: string, onSuccess: (file: File) => void) {
    return {
      resolve,
      fullPath: 'full path to file',
      isFile,
      openStream,
    }
  }
  const directory = {
    listFiles: listFiles,
    resolve,
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
}

describe('readCountries', () => {
  test('success read countries', () => {
    const files = [
      {
        name: 'coromonitor',
        isDirectory: true,
      },
      {
        name: 'file2',
        isDirectory: false,
      },
      {
        name: 'chosenCountries.txt',
        isFile: true,
      },
    ] as Array<any>
    setUp(files)
    readCountries()
    expect(openStream).toBeCalledTimes(1)
  })

  test('directory not exists', async () => {
    const files = [
      {
        name: 'notDirectory',
        isDirectory: false,
      },
      {
        name: 'file2',
        isDirectory: false,
      },
    ] as Array<any>
    setUp(files)

    try {
      await readCountries()
    } catch (err) {
      expect(err).toBeNull()
    }

    expect(openStream).not.toBeCalled()
  })

  test('Error. chosenCountries.txt is not file', async () => {
    const files = [
      {
        name: 'coromonitor',
        isDirectory: true,
      },
      {
        name: 'file2',
        isDirectory: false,
      },
    ] as Array<any>
    setUp(files, false)

    try {
      await readCountries()
    } catch (err) {
      expect(err).toBeNull()
    }

    expect(openStream).not.toBeCalled()
  })
})
