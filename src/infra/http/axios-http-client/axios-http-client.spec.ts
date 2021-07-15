import { mockAxios, mockHttpResponse } from '@/infra/test'
import { AxiosHttpClientAdapter } from './axios-http-client'
import { HttpPostParams } from '@/data/protocols/http'
import { mockGetRequest, mockPostRequest } from '@/data/test'
import axios, { AxiosResponse } from 'axios'

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
  describe('post', () => {
    test('Should call axios.post with correct values', async () => {
      const { sut, mockedAxios } = makeSut()
      const request = mockPostRequest()
      const { url, body } = request
      await sut.post(request)
      expect(mockedAxios.post).toHaveBeenCalledWith(url, body)
    })

    test('Should return correct response on axios.post', async () => {
      const { sut, mockedAxios, mockedPostRequest } = makeSut()
      const httpResponse = await sut.post(mockedPostRequest)
      const axiosResponse = await mockedAxios.post.mock.results[0].value as AxiosResponse
      expect(httpResponse).toEqual({
        statusCode: axiosResponse.status,
        body: axiosResponse.data
      })
    })

    test('Should return correct correct error on axios.post', async () => {
      const { sut, mockedAxios, mockedPostRequest } = makeSut()
      mockedAxios.post.mockRejectedValueOnce({
        response: mockHttpResponse()
      })
      const promiseHttpResponse = sut.post(mockedPostRequest)
      expect(promiseHttpResponse).toEqual(mockedAxios.post.mock.results[0].value)
    })
  })

  describe('get', () => {
    test('Should call axios.get with correct values', async () => {
      const request = mockGetRequest()
      const { sut, mockedAxios } = makeSut()
      await sut.get(request)
      const { url } = request
      expect(mockedAxios.get).toHaveBeenCalledWith(url)
    })
  })

  test('Should return correct response on axios.post', async () => {
    const { sut, mockedAxios } = makeSut()
    const httpResponse = await sut.get(mockGetRequest())
    const axiosResponse = await mockedAxios.get.mock.results[0].value as AxiosResponse
    expect(httpResponse).toEqual({
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    })
  })

  test('Should return correct correct error on axios.get', async () => {
    const { sut, mockedAxios } = makeSut()
    mockedAxios.get.mockRejectedValueOnce({
      response: mockHttpResponse()
    })
    const promiseHttpResponse = sut.get(mockGetRequest())
    expect(promiseHttpResponse).toEqual(mockedAxios.get.mock.results[0].value)
  })
})
