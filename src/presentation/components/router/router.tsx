import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'

type Factory = {
  makeLogin: React.FC
  makeSignUp: React.FC
}

const Router: React.FC<Factory> = (factory: Factory) => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path='/login' component={factory.makeLogin} />
        <Route exact path='/signup' component={factory.makeSignUp} />
      </Switch>
    </HashRouter>
  )
}

export default Router
