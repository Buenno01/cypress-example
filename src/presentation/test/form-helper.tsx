import { fireEvent, screen } from '@testing-library/react'
import faker from 'faker'

export const testChildCount = (fieldName: string, count: number): void => {
  expect(screen.getByTestId(fieldName).children).toHaveLength(count)
}

export const testButtonIsDisabled = (fieldName: string, isDisabled: boolean): void => {
  isDisabled
    ? expect(screen.getByTestId(fieldName)).toBeDisabled()
    : expect(screen.getByTestId(fieldName)).toBeEnabled()
}

export const testStatusFieldValidation = (fieldName: string, validationError: string = ''): void => {
  const wrap = screen.getByTestId(`${fieldName}-wrap`)
  const field = screen.getByTestId(`${fieldName}`)
  expect(wrap.getAttribute('data-status')).toBe(validationError ? 'invalid' : 'valid')
  expect(field).toHaveProperty('title', validationError)
}

export const populateField = (fieldName: string, value = faker.random.word()): void => {
  const inputField = screen.getByTestId(fieldName)
  fireEvent.input(inputField, { target: { value } })
}

export const testElementExists = (fieldName: string): void => {
  expect(screen.queryByTestId(fieldName)).toBeInTheDocument()
}

export const testElementText = (fieldName: string, text: string): void => {
  expect(screen.getByTestId(fieldName)).toHaveTextContent(text)
}
