import { HttpPostClient, HttpPostParams } from '../protocols/http/http-post-client'

export class HttpPostClientSpy implements HttpPostClient {
  public url?: string

  async post (params: HttpPostParams): Promise<void> {
    const { url } = params
    this.url = url
    return await Promise.resolve()
  }
}
