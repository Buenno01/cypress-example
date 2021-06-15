import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import { Login } from '../../pages'
import '@/presentation/styles/global.scss'

const Router: React.FC = () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path='/login' component={Login} />
      </Switch>
    </HashRouter>
  )
}

export default Router
