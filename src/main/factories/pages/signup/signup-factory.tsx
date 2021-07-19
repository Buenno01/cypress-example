import React from 'react'
import { makeSignUpValidation } from './signup-validation-factory'
import { makeRemoteAddAccount } from '@/main/factories/usecases/add-account/remote-add-account'
import { SignUp } from '@/presentation/pages/index'
import { makeLocalUpdateCurrentAccount } from '../../usecases/update-current-account/update-current-account-factory'

export const makeSignUp: React.FC = () => {
  return (<SignUp addAccount={makeRemoteAddAccount()} validation={makeSignUpValidation()} updateCurrentAccount={makeLocalUpdateCurrentAccount()} />)
}
