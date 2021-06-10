import { HttpPostClient, HttpPostParams } from '@/data/protocols/http/http-post-client'
import { HttpResponse, HttpStatusCode } from '../protocols/http/http-response'

export class HttpPostClientSpy implements HttpPostClient {
  public url?: string
  public body?: object
  public response: HttpResponse = {
    statusCode: HttpStatusCode.noContent
  }

  async post (params: HttpPostParams): Promise<HttpResponse> {
    const { url, body } = params
    this.url = url
    this.body = body
    return await Promise.resolve(this.response)
  }
}
