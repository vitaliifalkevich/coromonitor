import deleteData from '../deleteData'
import { CommonError } from '../types'

interface IFIle {}

const deleteFile = jest
  .fn()
  .mockImplementation(
    () => (
      fullPath: string,
      onSuccess: (file: IFIle) => void,
      onError: (err: CommonError) => void,
    ) => {},
  )
const deleteDirectory = jest
  .fn()
  .mockImplementation(
    () => (
      fullPath: string,
      recursive: boolean,
      onSuccess: (file: IFIle) => void,
      onError: (err: CommonError) => void,
    ) => {},
  )

function resolve(location: string, onSuccess: (file: IFIle) => void) {
  return {
    resolve,
    fullPath: 'full path to file',
    deleteFile,
    deleteDirectory,
  }
}

const directory = {
  resolve,
  deleteFile,
  deleteDirectory,
}

describe('deleteData', () => {
  test('delete', () => {
    Object.defineProperty(window, 'tizen', {
      writable: true,
      value: {
        filesystem: {
          resolve: jest.fn().mockImplementation((localtion, onsuccessCB) => {
            onsuccessCB(directory)
          }),
        },
      },
    })

    deleteData()
    expect(deleteDirectory).toBeCalledTimes(1)
    expect(deleteFile).toBeCalledTimes(1)
  })
})
