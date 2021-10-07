import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import { makeLogin, makeSignUp, makeSurveyList } from '@/main/factories/pages'
import { ApiContext } from '@/presentation/contexts/'
import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '@/main/adapters/current-account-adapter'
import { PrivateRoute } from '@/presentation/components'

const Router: React.FC = () => {
  return (
    <ApiContext.Provider value={
      {
        setCurrentAccount: setCurrentAccountAdapter,
        getCurrentAccount: getCurrentAccountAdapter
      }
    }>
      <HashRouter>
        <Switch>
          <Route exact path='/login' component={makeLogin} />
          <Route exact path='/signup' component={makeSignUp} />
          <PrivateRoute exact path='/' component={makeSurveyList} />
        </Switch>
      </HashRouter>
    </ApiContext.Provider>
  )
}

export default Router
