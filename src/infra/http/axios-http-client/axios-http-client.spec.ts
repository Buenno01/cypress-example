import { mockAxios, mockHttpResponse } from '@/infra/test'
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
  describe('post', () => {
    test('Should call axios.post with correct values', async () => {
      const { sut, mockedAxios } = makeSut()
      mockedAxios.post.mockResolvedValue(mockHttpResponse())
      const request = mockPostRequest()
      const { url, body } = request
      await sut.post(request)
      expect(mockedAxios.post).toHaveBeenCalledWith(url, body)
    })

    test('Should return correct response on axios.post', async () => {
      const { sut, mockedAxios, mockedPostRequest } = makeSut()
      mockedAxios.post.mockResolvedValue(mockHttpResponse())
      const promiseHttpResponse = sut.post(mockedPostRequest)
      expect(promiseHttpResponse).toEqual(mockedAxios.post.mock.results[0].value)
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
})
