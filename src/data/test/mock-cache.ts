import { GetStorage } from '../protocols/cash'
import faker from 'faker'

export class GetStorageSpy implements GetStorage {
  key: string
  value: any = faker.random.objectElement()

  get (key: string): any {
    this.key = key
    return this.value
  }
}
