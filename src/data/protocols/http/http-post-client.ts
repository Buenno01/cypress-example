import { HttpResponse } from './'

export type HttpPostParams<T> = {
  url: string
  body?: T
}

export interface HttpPostClient<BodyType, ResponseType> {
  post: (params: HttpPostParams<BodyType>) => Promise<HttpResponse<ResponseType>>
}
