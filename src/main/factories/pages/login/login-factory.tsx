import React from 'react'
import { makeLoginValidation } from './login-validation-factory'
import { makeRemoteAuthentication } from '@/main/factories/usecases/authentication/remote-authentication-factory'
import { Login } from '@/presentation/pages/index'
import { makeLocalUpdateCurrentAccount } from '../../usecases/update-current-account/update-current-account-factory'

export const makeLogin: React.FC = () => {
  return (<Login authentication={makeRemoteAuthentication()} validation={makeLoginValidation()} updateCurrentAccount={makeLocalUpdateCurrentAccount()} />)
}
