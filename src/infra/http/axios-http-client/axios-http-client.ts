import { HttpPostParams } from '@/data/protocols/http'
import axios from 'axios'

export class AxiosHttpClient {
  async post (params: HttpPostParams<any>): Promise<void> {
    const { url, body } = params
    await axios.post(url, body)
    return await Promise.resolve()
  }
}
