import { HttpResponse } from './'

export type HttpPostParams<T> = {
  url: string
  body?: T
}

export interface HttpPostClient<TypeParams, TypeResponse> {
  post: (params: HttpPostParams<TypeParams>) => Promise<HttpResponse<TypeResponse>>
}
