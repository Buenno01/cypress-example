import { InvalidFieldError } from '@/validation/errors/invalid-field-error'
import faker from 'faker'
import { CompareFieldsValidation } from './compare-field-validation'

const makeSut = (field, fieldToCompare): CompareFieldsValidation => new CompareFieldsValidation(field, fieldToCompare)

describe('CompareFieldsValidation', () => {
  test('Should return error if compare is invalid', () => {
    const field = faker.random.alphaNumeric(3)
    const fieldToCompare = faker.random.alphaNumeric(4)
    const sut = makeSut(field, fieldToCompare)
    const error = sut.validate({ [field]: faker.random.alphaNumeric(3), [fieldToCompare]: faker.random.alphaNumeric(4) })
    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should return falsy if compare is valid', () => {
    const field = faker.database.column()
    const fieldToCompare = faker.database.column()
    const value = faker.random.word()
    const sut = makeSut(field, fieldToCompare)
    const error = sut.validate({ [field]: value, [fieldToCompare]: value })
    expect(error).toBeFalsy()
  })
})
