import * as Helper from './http-mocks'
import faker from 'faker'

export const mockEmailInUseError = (): void => Helper.mockEmailInUseError(/signup/)
export const mockInvalidData = (): void => Helper.mockOk(/signup/, 'POST', { invalid: faker.datatype.uuid() })
