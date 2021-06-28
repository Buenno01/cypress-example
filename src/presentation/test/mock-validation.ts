import { Validation } from '@/presentation/protocols/validation'

interface Field {
  value: string
  name: string
  errorMessage: string
}

export class ValidationSpy implements Validation {
  fields: { [fieldName: string]: Field }
  fieldName: string
  fieldValue: string
  errorMessage: string

  validate (fieldName: string, fieldValue: string): string {
    this.fields = { ...this.fields, [fieldName]: { value: fieldValue, errorMessage: this.errorMessage, name: fieldName } }
    return this.fields[fieldName].errorMessage
  }
}
