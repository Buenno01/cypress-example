import React from 'react'
import { SurveyList } from '@/presentation/pages/index'
import { makeRemoteLoadSurveyList } from '@/main/factories/usecases/load-survey-list/remote-load-survey-list-factory'

export const makeSurveyList: React.FC = () => {
  return (<SurveyList loadSurveyList={makeRemoteLoadSurveyList()} />)
}
