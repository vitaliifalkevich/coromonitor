import saga from './saga'
import { actions, keyName } from './slice'
import { useInjectReducer, useInjectSaga } from 'redux-injectors'
import { reducer } from '../components/PreloadedEntities/slice'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

const useSubscription = () => {
  useInjectReducer({ key: keyName, reducer })
  useInjectSaga({ key: keyName, saga })

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(actions.startCheckPurchased())
  }, [dispatch])
}

export default useSubscription
