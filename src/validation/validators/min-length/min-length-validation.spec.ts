import { MinLengthFieldError } from '@/validation/errors/min-length-field-error'
import { MinLengthValidation } from './min-length-validation'
import faker from 'faker'

type SutProps = {
  field: string
  minLength?: number
}

const makeSut = ({ field, minLength = 5 }: SutProps): MinLengthValidation => new MinLengthValidation(field, minLength)

describe('MinLengthValidation', () => {
  test('Should return error if value is invalid', () => {
    const field = faker.database.column()
    const sut = makeSut({ field })
    const error = sut.validate({ [field]: faker.random.alphaNumeric(4) })
    expect(error).toEqual(new MinLengthFieldError())
  })

  test('Should return falsy if value is valid', () => {
    const field = faker.database.column()
    const sut = makeSut({ field })
    const error = sut.validate({ [field]: faker.random.alphaNumeric(5) })
    expect(error).toBeFalsy()
  })

  test('Should return falsy if field does not exists in sechema', () => {
    const sut = makeSut({ field: faker.database.column() })
    const error = sut.validate({ [faker.database.column()]: faker.random.alphaNumeric(5) })
    expect(error).toBeFalsy()
  })
})
