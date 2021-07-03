import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import Input from './input'
import Context from '@/presentation/contexts/form/form-context'

const makeSut = (): RenderResult => {
  const result = render(
    <Context.Provider value={{ errorState: {} }}>
      <Input name="field" />
    </Context.Provider>)

  return result
}

describe('Input Component', () => {
  test('Should begin with readOnly', () => {
    const { getByTestId } = makeSut()
    const input = getByTestId('field') as HTMLInputElement
    expect(input.readOnly).toBe(true)
  })
})
