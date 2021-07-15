import { HttpPostClient, HttpPostParams, HttpResponse } from '@/data/protocols/http'
import axios from 'axios'

export class AxiosHttpClientAdapter implements HttpPostClient<any, any> {
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
}
