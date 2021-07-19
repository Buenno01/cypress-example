import React, { useEffect, useState } from 'react'
import Styles from './signup-styles.scss'
import { Footer, FormStatus, Input, LoginHeader as Header, SubmitButton } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'
import { Validation } from '@/presentation/protocols/validation'
import { AddAccount, UpdateCurrentAccount } from '@/domain/usecases'
import { useHistory, Link } from 'react-router-dom'

type Props = {
  validation: Validation
  addAccount: AddAccount
  updateCurrentAccount: UpdateCurrentAccount
}

const SignUp: React.FC<Props> = ({ validation, addAccount, updateCurrentAccount }: Props) => {
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
    const { name, email, password, passwordConfirmation } = state
    const formData = { name, email, password, passwordConfirmation }
    const nameError = validation.validate('name', formData)
    const emailError = validation.validate('email', formData)
    const passwordError = validation.validate('password', formData)
    const passwordConfirmationError = validation.validate('passwordConfirmation', formData)
    setErrorState({
      ...errorState,
      name: nameError,
      email: emailError,
      password: passwordError,
      passwordConfirmation: passwordConfirmationError
    })
    setState({
      ...state,
      isFormInvalid: !!nameError || !!emailError || !!passwordError || !!passwordConfirmationError
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
      await updateCurrentAccount.save(account)
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
    <div className={Styles.signupWrap}>
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
