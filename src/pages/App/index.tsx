import React from 'react'
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom'
import Global from 'pages/Global'
import Settings from 'pages/Settings'
import ByCountry from 'pages/ByCountry'
import ChartStatistic from 'pages/ChartStatistic'

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Global} />
        <Route path="/settings" component={Settings} />
        <Route path="/country/:countryName" component={ByCountry} />
        <Route path="/statistic/:countryName" component={ChartStatistic} />
      </Switch>
    </Router>
  )
}

export default App
