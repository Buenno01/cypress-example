import { HttpGetClient, HttpGetParams, HttpPostClient, HttpPostParams, HttpResponse } from '@/data/protocols/http'
import axios from 'axios'

export class AxiosHttpClientAdapter implements HttpPostClient<any, any>, HttpGetClient<any> {
  async post (params: HttpPostParams<any>): Promise<HttpResponse<any>> {
    let httpResponse: HttpResponse
    try {
      const { url, body } = params
      const axiosResponse = await axios.post(url, body)
      httpResponse = {
        statusCode: axiosResponse.status,
        body: axiosResponse.data
      }
    } catch (error) {
      httpResponse = {
        statusCode: error.response.status,
        body: error.response.data
      }
    }
    return httpResponse
  }

  async get (params: HttpGetParams): Promise<HttpResponse> {
    let httpResponse: HttpResponse
    try {
      const { url } = params
      const axiosResponse = await axios.get(url, { headers: params.headers })
      httpResponse = {
        statusCode: axiosResponse.status,
        body: axiosResponse.data
      }
    } catch (error) {
      httpResponse = {
        statusCode: error.response.status,
        body: error.response.data
      }
    }
    return httpResponse
  }
}
