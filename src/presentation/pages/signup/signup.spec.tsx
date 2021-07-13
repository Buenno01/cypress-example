import React from 'react'
import { cleanup, render, RenderResult } from '@testing-library/react'
import SignUp from './signup'
import { FormHelper, ValidationSpy } from '@/presentation/test/'
import faker from 'faker'

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationSpy = new ValidationSpy()
  validationSpy.errorMessage = params?.validationError
  const sut = render(<SignUp validation={validationSpy} />)
  return {
    sut,
    validationSpy
  }
}

describe('SignUp Component', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const validationError = 'Campo obrigatório'
    const { sut } = makeSut({ validationError })
    FormHelper.testChildCount(sut, 'error-wrap', 0)
    FormHelper.testButtonIsDisabled(sut, 'submit', true)
    FormHelper.testStatusFieldValidation(sut, 'name', validationError)
    FormHelper.testStatusFieldValidation(sut, 'email', validationError)
    FormHelper.testStatusFieldValidation(sut, 'password', validationError)
    FormHelper.testStatusFieldValidation(sut, 'passwordConfirmation', validationError)
  })

  test('Should show name error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    FormHelper.populateField(sut, 'name')
    FormHelper.testStatusFieldValidation(sut, 'name', validationError)
  })
})
