import { fireEvent, RenderResult } from '@testing-library/react'
import faker from 'faker'

export const testChildCount = (sut: RenderResult, fieldName: string, count: number): void => {
  const errorWrap = sut.getByTestId(fieldName)
  expect(errorWrap.childElementCount).toBe(count)
}

export const testButtonIsDisabled = (sut: RenderResult, fieldName: string, isDisabled: boolean): void => {
  const element = sut.getByTestId(fieldName) as HTMLButtonElement
  expect(element.disabled).toBe(isDisabled)
}

export const testStatusFieldValidation = (sut: RenderResult, fieldName: string, validationError?: string): void => {
  const fieldStatus = sut.getByTestId(`${fieldName}-status`)
  expect(fieldStatus.title).toBe(validationError || 'Campo válido')
  expect(fieldStatus.className).toBe(validationError ? 'statusError' : 'statusSuccess')
}

export const populateField = (sut: RenderResult, fieldName: string, value = faker.random.word()): void => {
  const inputField = sut.getByTestId(fieldName)
  fireEvent.input(inputField, { target: { value } })
}

export const testElementExists = (sut: RenderResult, fieldName: string): void => {
  const element = sut.getByTestId(fieldName)
  expect(element).toBeTruthy()
}
