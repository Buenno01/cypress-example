import { Validation } from '@/presentation/protocols/validation'

interface Field {
  value: string
  name: string
  errorMessage: string
}

export class ValidationSpy implements Validation {
  input: { [fieldName: string]: Field }
  errorMessage: string

  validate (fieldName: string, input: object): string {
    input[fieldName] = { value: input[fieldName], errorMessage: this.errorMessage, name: fieldName }
    this.input = input as { [fieldName: string]: Field }
    return this.errorMessage
  }
}
