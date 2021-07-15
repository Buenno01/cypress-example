import { HttpResponse } from './http-response'

export interface HttpGetParams {
  url: string
}

export interface HttpGetClient<ResponseType> {
  get: (params: HttpGetParams) => Promise<HttpResponse<ResponseType>>
}
