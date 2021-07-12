import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import SignUp from './signup'

const testChildCount = (sut: RenderResult, fieldName: string, count: number): void => {
  const errorWrap = sut.getByTestId(fieldName)
  expect(errorWrap.childElementCount).toBe(count)
}

const testButtonIsDisabled = (sut: RenderResult, fieldName: string, isDisabled: boolean): void => {
  const element = sut.getByTestId(fieldName) as HTMLButtonElement
  expect(element.disabled).toBe(isDisabled)
}

const testStatusFieldValidation = (sut: RenderResult, fieldName: string, validationError?: string): void => {
  const fieldStatus = sut.getByTestId(`${fieldName}-status`)
  expect(fieldStatus.title).toBe(validationError || 'Campo válido')
  expect(fieldStatus.className).toBe(validationError ? 'statusError' : 'statusSuccess')
}

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
    testChildCount(sut, 'error-wrap', 0)
    testButtonIsDisabled(sut, 'submit', true)
    testStatusFieldValidation(sut, 'name', validationError)
    testStatusFieldValidation(sut, 'email', validationError)
    testStatusFieldValidation(sut, 'password', validationError)
    testStatusFieldValidation(sut, 'passwordConfirmation', validationError)
  })
})
