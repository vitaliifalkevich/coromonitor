import config from 'config'
const deleteData = () => {
  window.tizen.filesystem.resolve('documents', function (dir) {
    /* Firstly chosen what to delete */
    const fileToDelete = dir.resolve(
      `${config.BASE_DIRECTORY}/${config.chosenCountriesFileName}.txt`,
    )
    const directory1 = dir.resolve(config.BASE_DIRECTORY)

    /* Delete */
    dir.deleteFile(
      fileToDelete.fullPath,
      function () {
        console.log('File Deleted')
      },
      function (e) {
        console.log('Error' + e.message)
      },
    )
    dir.deleteDirectory(
      directory1.fullPath,
      true,
      function () {
        console.log('coromonitor Deleted')
      },
      function (e) {
        console.log('Error' + e.message)
      },
    )
  })
}

export default deleteData
