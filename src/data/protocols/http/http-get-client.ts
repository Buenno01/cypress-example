import { HttpResponse } from './http-response'

export interface HttpGetParams {
  url: string
  headers?: any
}

export interface HttpGetClient<ResponseType = any> {
  get: (params: HttpGetParams) => Promise<HttpResponse<ResponseType>>
}
