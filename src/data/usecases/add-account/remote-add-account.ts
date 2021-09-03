import { HttpPostClient, HttpStatusCode } from '@/data/protocols/http'
import { EmailInUseError, UnexpectedError } from '@/domain/errors'
import { AccountModel } from '@/domain/models'
import { AddAccount } from '@/domain/usecases'

export class RemoteAddAccount implements AddAccount {
  private readonly httpPostClient: HttpPostClient<RemoteAddAccount.Params, RemoteAddAccount.Model>
  private readonly url: string

  constructor (url: string, httpPostClient: HttpPostClient<AddAccount.Params, AddAccount.Model>) {
    this.url = url
    this.httpPostClient = httpPostClient
  }

  async add (params: AddAccount.Params): Promise<AddAccount.Model> {
    const { statusCode, body } = await this.httpPostClient.post({
      url: this.url,
      body: params
    })

    switch (statusCode) {
      case HttpStatusCode.ok: return body
      case HttpStatusCode.forbidden: throw new EmailInUseError()
      default: throw new UnexpectedError()
    }
  }
}

export namespace RemoteAddAccount {
  export type Params = AddAccount.Params
  export type Model = AccountModel
}
