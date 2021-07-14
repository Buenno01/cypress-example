import { MinLengthFieldError } from '@/validation/errors/min-length-field-error'
import { FieldValidation } from '@/validation/protocols/field-validation'

export class MinLengthValidation implements FieldValidation {
  constructor (readonly field, private readonly minLength: number) {}

  validate (input: object): Error {
    return input[this.field]?.length < this.minLength ? new MinLengthFieldError() : null
  }
}
