import { HttpGetClient, HttpGetParams, HttpPostClient, HttpPostParams, HttpResponse, HttpStatusCode } from '@/data/protocols/http/'
import faker from 'faker'

export const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()
})

export const mockGetRequest = (): HttpGetParams => ({
  url: faker.internet.url()
})

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

export class HttpGetClientSpy<ResponseType> implements HttpGetClient<ResponseType> {
  public url: string
  public response: HttpResponse<ResponseType> = {
    statusCode: HttpStatusCode.ok
  }

  async get (params: HttpGetParams): Promise<HttpResponse<ResponseType>> {
    this.url = params.url
    return await Promise.resolve(this.response)
  }
}
