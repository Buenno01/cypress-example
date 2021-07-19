import { GetStorage } from '@/data/protocols/cash'
import { SetStorage } from '@/data/protocols/cash/set-storage'

export class LocalStorageAdapter implements SetStorage, GetStorage {
  set (key: string, value: object): void {
    localStorage.setItem(key, JSON.stringify(value))
  }

  get (key: string): any {
    return JSON.parse(localStorage.getItem(key))
  }
}
