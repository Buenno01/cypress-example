import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import SignUp from './signup'
import { AddAccountSpy, FormHelper, ValidationSpy } from '@/presentation/test/'
import faker from 'faker'
import { EmailInUseError } from '@/domain/errors'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { ApiContext } from '@/presentation/contexts'
import { AccountModel } from '@/domain/models'

const simulateValidSubmit = async (name = faker.name.findName(), email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
  FormHelper.populateField('name', name)
  FormHelper.populateField('email', email)
  FormHelper.populateField('password', password)
  FormHelper.populateField('passwordConfirmation', password)
  const form = screen.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

type SutTypes = {
  validationSpy: ValidationSpy
  addAccountSpy: AddAccountSpy
  setCurrentAccountMock: (account: AccountModel) => void
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/signup'] })
const makeSut = (params?: SutParams): SutTypes => {
  const validationSpy = new ValidationSpy()
  const addAccountSpy = new AddAccountSpy()
  validationSpy.errorMessage = params?.validationError
  const setCurrentAccountMock = jest.fn()
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <Router history={history} >
        <SignUp validation={validationSpy} addAccount={addAccountSpy} />
      </Router>
    </ApiContext.Provider>
  )
  return {
    validationSpy,
    addAccountSpy,
    setCurrentAccountMock
  }
}

describe('SignUp Component', () => {
  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    FormHelper.testChildCount('error-wrap', 0)
    FormHelper.testButtonIsDisabled('submit', true)
    FormHelper.testStatusFieldValidation('name', validationError)
    FormHelper.testStatusFieldValidation('email', validationError)
    FormHelper.testStatusFieldValidation('password', validationError)
    FormHelper.testStatusFieldValidation('passwordConfirmation', validationError)
  })

  test('Should show name error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    FormHelper.populateField('name')
    FormHelper.testStatusFieldValidation('name', validationError)
  })

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    FormHelper.populateField('email')
    FormHelper.testStatusFieldValidation('email', validationError)
  })

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    FormHelper.populateField('password')
    FormHelper.testStatusFieldValidation('password', validationError)
  })

  test('Should show passwordConfirmation error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    FormHelper.populateField('passwordConfirmation')
    FormHelper.testStatusFieldValidation('passwordConfirmation', validationError)
  })

  test('Should show valid name state if Validation succeeds', () => {
    makeSut()
    FormHelper.populateField('name')
    FormHelper.testStatusFieldValidation('name')
  })

  test('Should show valid email state if Validation succeeds', () => {
    makeSut()
    FormHelper.populateField('email')
    FormHelper.testStatusFieldValidation('email')
  })

  test('Should show valid password state if Validation succeeds', () => {
    makeSut()
    FormHelper.populateField('password')
    FormHelper.testStatusFieldValidation('password')
  })

  test('Should show valid passwordConfirmation state if Validation succeeds', () => {
    makeSut()
    FormHelper.populateField('passwordConfirmation')
    FormHelper.testStatusFieldValidation('passwordConfirmation')
  })

  test('Should enable submit button if form is valid', () => {
    makeSut()
    FormHelper.populateField('name')
    FormHelper.populateField('email')
    FormHelper.populateField('password')
    FormHelper.populateField('passwordConfirmation')
    FormHelper.testButtonIsDisabled('submit', false)
  })

  test('Should show loader on submit', async () => {
    makeSut()
    await simulateValidSubmit()
    FormHelper.testElementExists('loader')
  })

  test('Should call AddAccount with correct values', async () => {
    const { addAccountSpy } = makeSut()
    const name = faker.name.findName()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await simulateValidSubmit(name, email, password)
    expect(addAccountSpy.params).toEqual({
      name, email, password, passwordConfirmation: password
    })
  })

  test('Should call AddAccount only once', async () => {
    const { addAccountSpy } = makeSut()
    await simulateValidSubmit()
    await simulateValidSubmit()
    expect(addAccountSpy.callsCount).toBe(1)
  })

  test('Should not call AddAccount if form is invalid', async () => {
    const validationError = faker.random.words()
    const { addAccountSpy } = makeSut({ validationError })
    await simulateValidSubmit()
    expect(addAccountSpy.callsCount).toBe(0)
  })

  test('Should present error if AddAccount fails', async () => {
    const { addAccountSpy } = makeSut()
    const error = new EmailInUseError()
    jest.spyOn(addAccountSpy, 'add').mockRejectedValue(error)
    await simulateValidSubmit()
    FormHelper.testElementText('main-error', error.message)
    FormHelper.testChildCount('error-wrap', 1)
  })

  test('Should call SaveAccessToken on success', async () => {
    const { setCurrentAccountMock, addAccountSpy } = makeSut()
    await simulateValidSubmit()
    expect(setCurrentAccountMock).toHaveBeenCalledWith(addAccountSpy.account)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  test('Should go to login page', () => {
    makeSut()
    const login = screen.getByTestId('login')
    fireEvent.click(login)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/login')
  })
})
