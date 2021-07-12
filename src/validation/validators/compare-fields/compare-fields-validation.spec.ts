import { InvalidFieldError } from '@/validation/errors/invalid-field-error'
import faker from 'faker'
import { CompareFieldsValidation } from './compare-field-validation'

describe('CompareFieldsValidation', () => {
  test('Should return error if compare is invalid', () => {
    const valueToCompare = faker.random.word()
    const sut = new CompareFieldsValidation(faker.database.column(), valueToCompare)
    const error = sut.validate(faker.random.word())
    expect(error).toEqual(new InvalidFieldError())
  })
})
