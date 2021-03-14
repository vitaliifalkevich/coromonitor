import config from 'config'
import { File } from 'tizen-common-web'

const getDirectory = (files: File[], dir: File): File => {
  let coromonitorDir: File
  const searchableDirectory = files.find(
    item => item.name === config.BASE_DIRECTORY && item.isDirectory,
  )
  if (searchableDirectory) {
    coromonitorDir = searchableDirectory
  } else coromonitorDir = dir.createDirectory(config.BASE_DIRECTORY)

  return coromonitorDir
}

export default getDirectory
