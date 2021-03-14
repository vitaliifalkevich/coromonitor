import { ResultCallbackWriteToFile, CommonError } from './types'
import { File } from 'tizen-common-web'
import config from 'config'
import getDirectory from './getDirectory'

const makeCountryRecord = (
  countries: string,
  callBackResult: ResultCallbackWriteToFile,
) => {
  window.tizen.filesystem.resolve('documents', function (dir) {
    function onsuccess(files: File[]) {
      let coromonitorDir = getDirectory(files, dir)

      coromonitorDir.listFiles((files: File[]) => {
        let chosenCountriesFile: File
        const searchableFile = files.find(
          item =>
            item.name === `${config.chosenCountriesFileName}.txt` &&
            item.isFile,
        )
        if (searchableFile) chosenCountriesFile = searchableFile
        else {
          chosenCountriesFile = coromonitorDir.createFile('chosenCountries.txt')
        }

        chosenCountriesFile.openStream(
          'w',
          function (fs) {
            fs.write(countries)
            fs.close()
            callBackResult(true)
          },
          function (e) {
            callBackResult(e.message)
          },
          'UTF-8',
        )
      })
    }

    function onerror(error: CommonError) {
      console.log(
        'The error ' +
          error.message +
          ' occurred when listing the files in the selected folder',
      )
    }

    dir.listFiles(onsuccess, onerror)
  })
}

export default makeCountryRecord
