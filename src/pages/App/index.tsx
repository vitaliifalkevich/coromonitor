import React from 'react'
import { MemoryRouter as Router, Switch } from 'react-router-dom'

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        {/*  <Route exact path="/" component={Global} /> */}
        {/*  <Route path="/settings" component={Settings} />
          <Route path="/country/:countryName" component={ByCountry} />
          <Route path="/statistic/:countryName" component={Statistic} /> */}
      </Switch>
    </Router>
  )
}

export default App
