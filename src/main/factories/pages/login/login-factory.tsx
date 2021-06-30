import React from 'react'
import { Login } from '@/presentation/pages/index'
import { RemotheAuthentication } from '@/data/usecases/authentication/remote-authentication'
import { AxiosHttpClientAdapter } from '@/infra/http/axios-http-client/axios-http-client'
import { ValidationComposite } from '@/validation/validators/validation-composite/validation-composite'
import { ValidationBuilder } from '@/validation/validators/builder/validation-builder'

export const makeLogin: React.FC = () => {
  const url = 'http://fordevs.herokuapp.com/api/login'
  const axiosHttpClient = new AxiosHttpClientAdapter()
  const remoteAuthentication = new RemotheAuthentication(url, axiosHttpClient)
  const validationComposite = ValidationComposite.build([
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().min(5).build()
  ])
  return (<Login authentication={remoteAuthentication} validation={validationComposite} />)
}
