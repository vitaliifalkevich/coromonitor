const appExit = (event: any) => {
  if (event.keyName === 'back') {
    window.tizen.application.getCurrentApplication().exit()
  }
}
export default appExit
