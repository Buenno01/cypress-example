import { fireEvent, screen } from '@testing-library/react'
import faker from 'faker'

export const testChildCount = (fieldName: string, count: number): void => {
  const errorWrap = screen.getByTestId(fieldName)
  expect(errorWrap.childElementCount).toBe(count)
}

export const testButtonIsDisabled = (fieldName: string, isDisabled: boolean): void => {
  const element = screen.getByTestId(fieldName) as HTMLButtonElement
  expect(element.disabled).toBe(isDisabled)
}

export const testStatusFieldValidation = (fieldName: string, validationError: string = ''): void => {
  const wrap = screen.getByTestId(`${fieldName}-wrap`)
  const field = screen.getByTestId(`${fieldName}`)
  expect(wrap.getAttribute('data-status')).toBe(validationError ? 'invalid' : 'valid')
  expect(field.title).toBe(validationError)
}

export const populateField = (fieldName: string, value = faker.random.word()): void => {
  const inputField = screen.getByTestId(fieldName)
  fireEvent.input(inputField, { target: { value } })
}

export const testElementExists = (fieldName: string): void => {
  const element = screen.getByTestId(fieldName)
  expect(element).toBeTruthy()
}

export const testElementText = (fieldName: string, text: string): void => {
  const element = screen.getByTestId(fieldName)
  expect(element.textContent).toBe(text)
}
