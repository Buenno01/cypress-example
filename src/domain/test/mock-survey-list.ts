import { SurveyModel } from '../models'
import { mockSurveyModel } from './mock-survey-model'

export const mockSurveyModelList = (): SurveyModel[] => ([
  mockSurveyModel(),
  mockSurveyModel(),
  mockSurveyModel()
])
