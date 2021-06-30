import { MinLengthFieldError } from '@/validation/errors/min-length-field-error'
import { FieldValidation } from '@/validation/protocols'

export class MinLengthValidation implements FieldValidation {
  constructor (readonly name, private readonly minLength: number) {}
  validate (value: string): Error {
    return value.length >= this.minLength ? null : new MinLengthFieldError()
  }
}
