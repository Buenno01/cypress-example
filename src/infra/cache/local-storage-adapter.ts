import { SetStorage } from '@/data/protocols/cash/set-storage'

export class LocalStorageAdapter implements SetStorage {
  async set (key: string, value: any): Promise<void> {
    localStorage.setItem(key, value)
  }
}
