import { HttpPostClient, HttpStatusCode } from '@/data/protocols/http'
import { EmailInUseError } from '@/domain/errors'
import { AddAccount } from '@/domain/usecases'

export class RemoteAddAccount implements AddAccount {
  private readonly httpPostClient: HttpPostClient<AddAccount.Params, AddAccount.Model>
  private readonly url: string

  constructor (url: string, httpPostClient: HttpPostClient<AddAccount.Params, AddAccount.Model>) {
    this.url = url
    this.httpPostClient = httpPostClient
  }

  async add (params: AddAccount.Params): Promise<AddAccount.Model> {
    const { statusCode } = await this.httpPostClient.post({
      url: this.url,
      body: params
    })

    switch (statusCode) {
      case HttpStatusCode.forbidden: throw new EmailInUseError()
    }
    return null
  }
}
