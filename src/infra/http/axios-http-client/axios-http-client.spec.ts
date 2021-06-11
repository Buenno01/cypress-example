import { mockAxios } from '@/infra/test'
import { AxiosHttpClientAdapter } from './axios-http-client'
import axios from 'axios'
import { HttpPostParams } from '@/data/protocols/http'
import { mockPostRequest } from '@/data/test'

type SutTypes = {
  sut: AxiosHttpClientAdapter
  mockedAxios: jest.Mocked<typeof axios>
  mockedPostRequest: HttpPostParams<any>
}

jest.mock('axios')
const makeSut = (): SutTypes => {
  const mockedAxios = mockAxios()
  const mockedPostRequest = mockPostRequest()
  const sut = new AxiosHttpClientAdapter()

  return {
    sut, mockedAxios, mockedPostRequest
  }
}

describe('AxiosHttpClientAdapter', () => {
  test('Should call axios with correct values', async () => {
    const { sut, mockedAxios } = makeSut()
    const request = mockPostRequest()
    const { url, body } = request
    await sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(url, body)
  })

  test('Should return the correct statusCode and body', async () => {
    const { sut, mockedAxios, mockedPostRequest } = makeSut()
    const promiseHttpResponse = sut.post(mockedPostRequest)
    expect(promiseHttpResponse).toEqual(mockedAxios.post.mock.results[0].value)
  })
})
