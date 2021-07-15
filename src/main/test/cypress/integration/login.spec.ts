import faker from 'faker'
import * as Helper from '../support/form-helper'
import * as Http from '../support/login-mocks'

const simulateValidSubmit = (): void => {
  cy.getByTestId('email').focus().type(faker.internet.email())
  cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
  cy.getByTestId('submit').click()
}

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })

  it('Should load with correct initial state', () => {
    cy.getByTestId('email').should('have.attr', 'readOnly')
    Helper.testInputStatus('email', 'Campo obrigatório')
    cy.getByTestId('password').should('have.attr', 'readOnly')
    Helper.testInputStatus('password', 'Campo obrigatório')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('email').focus().type(faker.random.word())
    Helper.testInputStatus('email', 'Campo inválido')
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3))
    Helper.testInputStatus('password', 'Tamanho mínimo de caracteres inválido')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email').focus().type(faker.internet.email())
    Helper.testInputStatus('email')
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    Helper.testInputStatus('password')
    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present invalidCredentialErrors if invalid credentials is provided', () => {
    Http.mockInvalidCredentialsError()
    simulateValidSubmit()
    cy.getByTestId('error-wrap')
    Helper.testMainError('Credenciais inválidas')
    Helper.testUrl('/login')
  })

  it('Should present UnexpectedError if invalid data is returned', () => {
    Http.mockInvalidData()
    simulateValidSubmit()
    cy.getByTestId('error-wrap')
    Helper.testMainError('Algum erro ocorreu. Tente novamente em breve.')
    Helper.testUrl('/login')
  })

  it('Should present save accesstoken if valid credentials are provided', () => {
    Http.mockOk()
    simulateValidSubmit()
    cy.getByTestId('loader').should('not.exist')
    cy.getByTestId('main-error').should('not.exist')
    Helper.testUrl('/')
    Helper.testLocalStorageItem('accessToken')
  })

  it('Should prevent multiple submits', () => {
    cy.intercept('POST', /login/, {
      statusCode: 200,
      body: {
        accessToken: faker.datatype.uuid()
      }
    }).as('request')
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    cy.getByTestId('submit').dblclick()
    Helper.testHttpCallsCount(1)
  })

  it('Should not call submits if form is invalid', () => {
    Http.mockOk()
    cy.getByTestId('email').focus().type(faker.internet.email()).type('{enter}')
    Helper.testHttpCallsCount(0)
  })
})
