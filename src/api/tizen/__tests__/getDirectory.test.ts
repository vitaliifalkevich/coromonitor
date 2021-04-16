import getDirectory from '../getDirectory'
import { File } from 'tizen-common-web'

const createDirectory = jest.fn()
const directory = { createDirectory } as any

describe('getDirectory', () => {
  test('getDirectory from existed', () => {
    const files = [
      {
        name: 'file1',
        isDirectory: true,
      },
      {
        name: 'file2',
        isDirectory: false,
      },
      {
        name: 'coromonitor',
        isDirectory: true,
      },
    ] as File[]
    const expectedValue = {
      name: 'coromonitor',
      isDirectory: true,
    }
    expect(getDirectory(files, directory)).toEqual(expectedValue)
  })

  test('getDirectory error', () => {
    const files = [
      {
        name: 'file1',
        isDirectory: true,
      },
      {
        name: 'file2',
        isDirectory: false,
      },
      {
        name: 'file3',
        isDirectory: true,
      },
    ] as File[]
    getDirectory(files, directory)
    expect(createDirectory).toBeCalledTimes(1)
  })
})
