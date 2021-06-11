import { HttpPostClient, HttpPostParams, HttpResponse } from '@/data/protocols/http'
import axios from 'axios'

export class AxiosHttpClientAdapter implements HttpPostClient<any, any> {
  async post (params: HttpPostParams<any>): Promise<HttpResponse<any>> {
    const { url, body } = params
    const axiosResponse = await axios.post(url, body)
    const httpResponse: HttpResponse<any> = {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
    return httpResponse
  }
}
