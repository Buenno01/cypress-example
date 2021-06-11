import { HttpPostClientSpy } from '@/data/test/'
import { RemotheAuthentication } from './remote-authentication'
import { mockAccountModel, mockAuthentication } from '@/domain/test/'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors/'
import { HttpStatusCode } from '@/data/protocols/http/'
import { AuthenticationParams } from '@/domain/usecases/'
import { AccountModel } from '@/domain/models/'

import faker from 'faker'

type SutTypes = {
  sut: RemotheAuthentication
  httpPostClientSpy: HttpPostClientSpy<AuthenticationParams, AccountModel>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => { // factory
  const httpPostClientSpy = new HttpPostClientSpy<AuthenticationParams, AccountModel>()
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

  test('Should throw UnexpectedError if HttpPostClient returns 400', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const body = mockAuthentication()
    const promise = sut.auth(body)
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpPostClient returns 404', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const body = mockAuthentication()
    const promise = sut.auth(body)
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpPostClient returns 500', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const body = mockAuthentication()
    const promise = sut.auth(body)
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should return an AccountModel if HttpPostClient returns 200', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const httpResult = mockAccountModel()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }
    const body = mockAuthentication()
    const account = await sut.auth(body)
    expect(account).toEqual(httpResult)
  })
})
