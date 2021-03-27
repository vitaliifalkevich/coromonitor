import { ThemeState } from 'styles/theme/types'
import { IState as GlobalState } from 'pages/Global/types'
import { IState as PreloadedState } from 'components/PreloadedEntities/types'
import { IState as byCountry } from 'pages/ByCountry/types'
import { IState as ISubscription } from 'subscription/types'

export interface RootState {
  theme: ThemeState
  global?: GlobalState
  preloadedEntities: PreloadedState
  byCountry?: byCountry
  subscription?: ISubscription
}
