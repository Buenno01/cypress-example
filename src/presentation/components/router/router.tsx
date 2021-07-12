import { SignUp } from '@/presentation/pages'
import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'

type Props = {
  makeLogin: React.FC
}

const Router: React.FC<Props> = ({ makeLogin }: Props) => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path='/login' component={makeLogin} />
        <Route exact path='/signup' component={SignUp} />
      </Switch>
    </HashRouter>
  )
}

export default Router
