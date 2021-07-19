import { SurveyList } from '@/presentation/pages'
import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import { makeLogin } from '../factories/pages/login/login-factory'
import { makeSignUp } from '../factories/pages/signup/signup-factory'

const Router: React.FC = () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path='/login' component={makeLogin} />
        <Route exact path='/signup' component={makeSignUp} />
        <Route exact path='/' component={SurveyList} />
      </Switch>
    </HashRouter>
  )
}

export default Router
