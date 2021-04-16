import React, { useCallback } from 'react'
import Logo from 'components/Logo'
import { useHistory } from 'react-router-dom'
import { Title, Message, Button, Text } from './styled'
import themes from './themes'
import ComponentThemeProvider from 'styles/theme/ComponentThemeProvider'

interface AlertSubscriptionProps {
  alertName: string
  alertMsg: string
  dispatchAction?: () => void
}
const AlertSubscription: React.FC<AlertSubscriptionProps> = ({
  alertName,
  alertMsg,
  dispatchAction,
}) => {
  const history = useHistory()

  const onBtnClick = useCallback(() => {
    dispatchAction && dispatchAction()
    history.push('/')
  }, [dispatchAction, history])

  return (
    <ComponentThemeProvider themes={themes}>
      <div className="ui-page ui-page-active">
        <Logo />
        <Title>{alertName}</Title>
        <Message>{alertMsg}</Message>
        <Button onClick={onBtnClick}>
          <Text>Ok</Text>
        </Button>
      </div>
    </ComponentThemeProvider>
  )
}

export default AlertSubscription
