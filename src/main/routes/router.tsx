import React from 'react'
import { SurveyList } from '@/presentation/pages'
import { HashRouter, Switch, Route } from 'react-router-dom'
import { makeLogin } from '@/main/factories/pages/login/login-factory'
import { makeSignUp } from '@/main/factories/pages/signup/signup-factory'
import { ApiContext } from '@/presentation/contexts/'
import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '@/main/adapters/current-account-adapter'

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
          <Route exact path='/' component={SurveyList} />
        </Switch>
      </HashRouter>
    </ApiContext.Provider>
  )
}

export default Router
