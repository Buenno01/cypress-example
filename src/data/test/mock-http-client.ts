import { HttpPostClient, HttpPostParams } from '@/data/protocols/http/http-post-client'
import { HttpResponse, HttpStatusCode } from '../protocols/http/http-response'

export class HttpPostClientSpy<TypeParams, TypeResponse> implements HttpPostClient<TypeParams, TypeResponse> {
  public url?: string
  public body?: TypeParams
  public response: HttpResponse<TypeResponse> = {
    statusCode: HttpStatusCode.ok
  }

  async post (params: HttpPostParams<TypeParams>): Promise<HttpResponse<TypeResponse>> {
    const { url, body } = params
    this.url = url
    this.body = body
    return await Promise.resolve(this.response)
  }
}
