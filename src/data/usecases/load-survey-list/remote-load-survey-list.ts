import { HttpGetClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError } from '@/domain/errors'
import { LoadSurveyList } from '@/domain/usecases'

export class RemoteLoadSurveyList implements LoadSurveyList {
  constructor (
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<LoadSurveyList.Model>
  ) {}

  async loadAll (): Promise<LoadSurveyList.Model> {
    const { statusCode, body } = await this.httpGetClient.get({ url: this.url })

    switch (statusCode) {
      case HttpStatusCode.ok: return await Promise.resolve(body)
      default: throw new UnexpectedError()
    }
  }
}
