import React, { useEffect, useState } from 'react'
import Styles from './signup-styles.scss'
import { Footer, FormStatus, Input, LoginHeader as Header } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'
import { Validation } from '@/presentation/protocols/validation'

type Props = {
  validation: Validation
}

const SignUp: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    name: '',
    password: '',
    passwordConfirmation: ''
  })

  const [errorState, setErrorState] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    main: ''
  })

  useEffect(() => {
    setErrorState({
      ...errorState,
      name: validation.validate('name', state.name),
      email: validation.validate('email', state.email),
      password: validation.validate('password', state.password),
      passwordConfirmation: validation.validate('passwordConfirmation', state.passwordConfirmation)
    })
  }, [state.name, state.email, state.password, state.passwordConfirmation])

  return (
    <div className={Styles.signup}>
      <Header />
      <Context.Provider value={{ state, errorState, setErrorState, setState }}>
        <form className={Styles.form}>
          <h2>Criar Conta</h2>
          <Input type="text" name="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <Input type="password" name="passwordConfirmation" placeholder="Repita sua senha" />
          <button className={Styles.submit} disabled={!!errorState.name || !!errorState.email || !!errorState.password || !!errorState.passwordConfirmation } data-testid="submit" type="submit">Entrar</button>
          <a href="/login" className={Styles.link}>Voltar para login</a>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default SignUp
