import React, { useEffect, useState } from 'react'
import Styles from './signup-styles.scss'
import { Footer, FormStatus, Input, LoginHeader as Header, SubmitButton } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'
import { Validation } from '@/presentation/protocols/validation'
import { AddAccount, SaveAccessToken } from '@/domain/usecases'
import { useHistory, Link } from 'react-router-dom'

type Props = {
  validation: Validation
  addAccount: AddAccount
  saveAccessToken: SaveAccessToken
}

const SignUp: React.FC<Props> = ({ validation, addAccount, saveAccessToken }: Props) => {
  const history = useHistory()

  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
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
    const name = validation.validate('name', state.name)
    const email = validation.validate('email', state.email)
    const password = validation.validate('password', state.password)
    const passwordConfirmation = validation.validate('passwordConfirmation', state.passwordConfirmation)
    setErrorState({
      ...errorState,
      name,
      email,
      password,
      passwordConfirmation
    })
    setState({
      ...state,
      isFormInvalid: !!name || !!email || !!password || !!passwordConfirmation
    })
  }, [state.name, state.email, state.password, state.passwordConfirmation])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    try {
      if (state.isLoading || state.isFormInvalid) return
      event.preventDefault()
      setState({
        ...state,
        isLoading: true
      })
      const account = await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation
      })
      await saveAccessToken.save(account.accessToken)
      history.replace('/')
    } catch (error) {
      setState({
        ...state,
        isLoading: false
      })
      setErrorState({
        ...errorState,
        main: error.message
      })
    }
  }

  return (
    <div className={Styles.signup}>
      <Header />
      <Context.Provider value={{ state, errorState, setErrorState, setState }}>
        <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
          <h2>Criar Conta</h2>
          <Input type="text" name="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <Input type="password" name="passwordConfirmation" placeholder="Repita sua senha" />
          <SubmitButton text="Cadastrar" />
          <Link to="/login" replace data-testid="login" className={Styles.link}>Voltar para login</Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default SignUp
