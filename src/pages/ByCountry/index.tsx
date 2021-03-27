import React, { useEffect } from 'react'
import { useInjectReducer, useInjectSaga } from 'redux-injectors'
import { useSelector, useDispatch } from 'react-redux'
import { keyName, reducer, actions } from './slice'
import saga from './saga'
import { useHistory } from 'react-router-dom'

const ByCountry: React.FC = () => {
  useInjectReducer({ key: keyName, reducer })
  useInjectSaga({ key: keyName, saga })
  const history = useHistory()
  console.log('history', history)
  const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(actions.getStatisticByCountry())
  // }, [dispatch])

  return <div>12</div>
}

export default ByCountry
