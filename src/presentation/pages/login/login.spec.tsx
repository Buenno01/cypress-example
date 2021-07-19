import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import { Login } from '@/presentation/pages/'
import { AuthenticationSpy, ValidationSpy, FormHelper } from '@/presentation/test/'
import faker from 'faker'
import { InvalidCredentialsError } from '@/domain/errors'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { ApiContext } from '@/presentation/contexts'
import { AccountModel } from '@/domain/models'

type SutTypes = {
  validationSpy: ValidationSpy
  authenticationSpy: AuthenticationSpy
  setCurrentAccountMock: (account: AccountModel) => void
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/login'] })
const makeSut = (params?: SutParams): SutTypes => {
  const validationSpy = new ValidationSpy()
  const authenticationSpy = new AuthenticationSpy()
  validationSpy.errorMessage = params?.validationError
  const setCurrentAccountMock = jest.fn()

  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <Router history={history}>
        <Login validation={validationSpy} authentication={authenticationSpy} />
      </Router>
    </ApiContext.Provider>
  )

  return {
    validationSpy,
    authenticationSpy,
    setCurrentAccountMock
  }
}

const simulateValidSubmit = async (email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
  FormHelper.populateField('email', email)
  FormHelper.populateField('password', password)
  const form = screen.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

describe('Login Component', () => {
  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    FormHelper.testButtonIsDisabled('submit', true)
    FormHelper.testStatusFieldValidation('email', validationError)
    FormHelper.testStatusFieldValidation('password', validationError)
    FormHelper.testChildCount('error-wrap', 0)
  })

  test('Should call Validation with correct email', () => {
    const { validationSpy } = makeSut()
    const email = faker.internet.email()
    FormHelper.populateField('email', email)
    expect(validationSpy.input.email.name).toBe('email')
    expect(validationSpy.input.email.value).toBe(email)
  })

  test('Should call Validation with correct password', () => {
    const { validationSpy } = makeSut()
    const password = faker.internet.password()
    FormHelper.populateField('password', password)
    expect(validationSpy.input.password.name).toBe('password')
    expect(validationSpy.input.password.value).toBe(password)
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

  test('Should enable submit button if form is valid', () => {
    makeSut()
    FormHelper.populateField('email')
    FormHelper.populateField('password')
    FormHelper.testButtonIsDisabled('submit', false)
  })

  test('Should show loader on submit', async () => {
    makeSut()
    await simulateValidSubmit()
    FormHelper.testElementExists('loader')
  })

  test('Should call Authentication with correct values', async () => {
    const { authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await simulateValidSubmit(email, password)
    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })

  test('Should call Authentication only once', async () => {
    const { authenticationSpy } = makeSut()
    await simulateValidSubmit()
    await simulateValidSubmit()
    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('Should not call Authentication if form is invalid', () => {
    const validationError = faker.random.words()
    const { authenticationSpy } = makeSut({ validationError })
    FormHelper.populateField('email')
    fireEvent.submit(screen.getByTestId('form'))
    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('Should present error if Authentication fails', async () => {
    const { authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(error))
    await simulateValidSubmit()
    FormHelper.testElementText('main-error', error.message)
    FormHelper.testChildCount('error-wrap', 1)
  })

  test('Should call SaveAccessToken on success', async () => {
    const { authenticationSpy, setCurrentAccountMock } = makeSut()
    await simulateValidSubmit()
    expect(setCurrentAccountMock).toHaveBeenCalledWith(authenticationSpy.account)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  test('Should go to signup page', async () => {
    makeSut()
    const signup = screen.getByTestId('signup')
    fireEvent.click(signup)
    expect(history.length).toBe(2)
    expect(history.location.pathname).toBe('/signup')
  })
})
