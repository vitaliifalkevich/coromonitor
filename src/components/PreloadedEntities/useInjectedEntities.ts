import { actions, keyName, reducer } from './slice'
import { useInjectReducer, useInjectSaga } from 'redux-injectors'
import { useLayoutEffect } from 'react'
import { useDispatch } from 'react-redux'
import saga from './saga'

const useInjectedEntities = () => {
  useInjectReducer({ key: keyName, reducer })
  useInjectSaga({ key: keyName, saga })

  const dispatch = useDispatch()

  useLayoutEffect(() => {
    dispatch(actions.getAffectedCountries())
  }, [dispatch])
}

export default useInjectedEntities
