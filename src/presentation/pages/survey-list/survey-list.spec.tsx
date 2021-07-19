import React from 'react'
import { screen, render } from '@testing-library/react'
import { SurveyList } from '@/presentation/pages'
import { LoadSurveyList } from '@/domain/usecases'
import { SurveyAnswerModel, SurveyModel } from '@/domain/models'
import faker from 'faker'

const mockSurveyAnswerModel = (): SurveyAnswerModel => {
  return {
    image: faker.internet.url(),
    answer: faker.random.words(3)
  }
}

const mockSurveyModel = (): SurveyModel => {
  return {
    id: faker.datatype.uuid(),
    question: faker.random.words(3),
    answers: [mockSurveyAnswerModel(), mockSurveyAnswerModel()],
    date: faker.date.recent(),
    didAnswer: faker.datatype.boolean()
  }
}

class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0

  async loadAll (): Promise<LoadSurveyList.Model> {
    this.callsCount++
    return await Promise.resolve([mockSurveyModel()])
  }
}

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy
}

const makeSut = (): SutTypes => {
  const loadSurveyListSpy = new LoadSurveyListSpy()
  render(<SurveyList loadSurveyList={loadSurveyListSpy}/>)

  return {
    loadSurveyListSpy
  }
}

describe('SurveyList Component', () => {
  test('Should present 4 empty items on start', () => {
    makeSut()
    const surveyList = screen.getByTestId('survey-list')
    expect(surveyList.querySelectorAll('li:empty').length).toBe(4)
  })

  test('Should call LoadSurveyList', () => {
    const { loadSurveyListSpy } = makeSut()
    expect(loadSurveyListSpy.callsCount).toBe(1)
  })
})
