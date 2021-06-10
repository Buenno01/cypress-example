import { HttpPostClientSpy } from '../../test/mock-http-client'
import { RemotheAuthentication } from './remote-authentication'
import { mockAuthentication } from '../../../domain/test/mock-authentication'
import faker from 'faker'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'
import { HttpStatusCode } from '@/data/protocols/http/http-response'

type SutTypes = {
  sut: RemotheAuthentication
  httpPostClientSpy: HttpPostClientSpy
}

const makeSut = (url: string = faker.internet.url()): SutTypes => { // factory
  const httpPostClientSpy = new HttpPostClientSpy()
  const sut = new RemotheAuthentication(url, httpPostClientSpy)
  return {
    sut,
    httpPostClientSpy
  }
}

describe('Remote Authentication', () => {
  test('Should call HttpClient with correct URL', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)
    await sut.auth(mockAuthentication())
    expect(httpPostClientSpy.url).toBe(url)
  })

  test('Should call HttpClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const body = mockAuthentication()
    await sut.auth(body)
    expect(httpPostClientSpy.body).toEqual(body)
  })

  test('Should throw InvalidCredentialsError if HttpPostClient returns 401', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unathorized
    }
    const body = mockAuthentication()
    const promise = sut.auth(body)
    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })
})
