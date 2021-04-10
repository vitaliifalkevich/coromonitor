import React from 'react'
import TrialScreenOrExpired from './TrialScreenOrExpired'
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom'
import Subscribe from './Subscribe'

const Subscription: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={TrialScreenOrExpired} />
        <Route path="/subscribe" component={Subscribe} />
      </Switch>
    </Router>
  )
}

export default Subscription
