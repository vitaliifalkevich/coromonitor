import config from 'config'
import { ResultCallbackReadFiles } from './types'
import { File } from 'tizen-common-web'

const readCountries = (callBackResult: ResultCallbackReadFiles) => {
  window.tizen.filesystem.resolve('documents', function (dir) {
    function onsuccess(files: File[]) {
      const isDirectoryExists = files.find(
        item => item.name === config.BASE_DIRECTORY && item.isDirectory,
      )

      if (!isDirectoryExists) {
        callBackResult(null)
        return
      }

      const fileToRead = dir.resolve(
        `${config.BASE_DIRECTORY}/${config.chosenCountriesFileName}.txt`,
      )
      if (fileToRead.isFile) {
        fileToRead.openStream(
          'r',
          function (fs) {
            try {
              const text = fs.read(fileToRead.fileSize)
              fs.close()
              callBackResult(text)
            } catch (err) {
              callBackResult(null)
            }
          },
          function (e) {
            callBackResult(null)
          },
          'UTF-8',
        )
      } else {
        callBackResult(null)
      }
    }

    function onerror(error: any) {
      console.log(
        'The error ' +
          error.message +
          ' occurred when listing the files in the selected folder',
      )
    }

    dir.listFiles(onsuccess, onerror)
  })
}

export default readCountries
