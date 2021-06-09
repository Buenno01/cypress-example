import { HttpPostClient, HttpPostParams } from '../protocols/http/http-post-client'

export class HttpPostClientSpy implements HttpPostClient {
  public url?: string
  public body?: object

  async post (params: HttpPostParams): Promise<void> {
    const { url, body } = params
    this.url = url
    this.body = body
    return await Promise.resolve()
  }
}
