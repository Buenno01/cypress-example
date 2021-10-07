import { SurveyModel } from '@/domain/models'

export interface LoadSurveyList {
  loadAll: () => Promise<LoadSurveyList.Model>
}

export namespace LoadSurveyList {
  export type Model = SurveyModel[]
}
