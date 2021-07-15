import React from 'react'
import { makeSignUpValidation } from './signup-validation-factory'
import { makeRemoteAddAccount } from '@/main/factories/usecases/add-account/remote-add-account'
import { makeLocalSaveAccessToken } from '@/main/factories/usecases/save-access-token/save-access-token-factory'
import { SignUp } from '@/presentation/pages/index'

export const makeSignUp: React.FC = () => {
  return (<SignUp addAccount={makeRemoteAddAccount()} validation={makeSignUpValidation()} saveAccessToken={makeLocalSaveAccessToken()} />)
}