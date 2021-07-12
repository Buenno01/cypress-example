import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import SignUp from './signup'
import { FormHelper } from '@/presentation/test/'

type SutTypes = {
  sut: RenderResult
}

const makeSut = (): SutTypes => {
  const sut = render(<SignUp />)
  return {
    sut
  }
}

describe('SignUp Component', () => {
  test('Should start with initial state', () => {
    const { sut } = makeSut()
    const validationError = 'Campo obrigatório'
    FormHelper.testChildCount(sut, 'error-wrap', 0)
    FormHelper.testButtonIsDisabled(sut, 'submit', true)
    FormHelper.testStatusFieldValidation(sut, 'name', validationError)
    FormHelper.testStatusFieldValidation(sut, 'email', validationError)
    FormHelper.testStatusFieldValidation(sut, 'password', validationError)
    FormHelper.testStatusFieldValidation(sut, 'passwordConfirmation', validationError)
  })
})
