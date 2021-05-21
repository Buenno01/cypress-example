import { HttpPostClientSpy } from '../../test/mock-http-client'
import { RemotheAuthentication } from './remote-authentication'
import faker from 'faker'

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
    await sut.auth()
    expect(httpPostClientSpy.url).toBe(url)
  })
})
