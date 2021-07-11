import { HttpPostClient } from '@/data/protocols/http'
import { AddAccount } from '@/domain/usecases'

export class RemoteAddAccount implements AddAccount {
  private readonly httpPostClient: HttpPostClient<AddAccount.Params, AddAccount.Model>
  private readonly url: string

  constructor (url: string, httpPostClient: HttpPostClient<AddAccount.Params, AddAccount.Model>) {
    this.url = url
    this.httpPostClient = httpPostClient
  }

  async add (params: AddAccount.Params): Promise<AddAccount.Model> {
    await this.httpPostClient.post({
      url: this.url,
      body: params
    })
    return null
  }
}
