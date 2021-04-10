import React from 'react'
import Subscription from '../'
import App from '../../pages/App'
import GlobalStyle from '../../styles/global-styles'
import { useSelector } from 'react-redux'
import { checkHaveSubscription } from '../selectors'

const CheckSubscription: React.FC = () => {
  const isHaveSubscription = useSelector(checkHaveSubscription)
  return (
    <>
      {isHaveSubscription ? <App /> : <Subscription />}
      <GlobalStyle />
    </>
  )
}

export default CheckSubscription
