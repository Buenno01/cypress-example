import { SetStorage } from '@/data/protocols/cash/set-storage'
import { LocalStorageAdapter } from '@/infra/cache/local-storage-adapter'

export const makeLocalStorageAdapter = (): SetStorage => {
  return new LocalStorageAdapter()
}
