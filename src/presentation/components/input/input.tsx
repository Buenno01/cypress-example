import React, { useContext } from 'react'
import Styles from './input-styles.scss'
import Context from '@/presentation/contexts/form/form-context'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  const { errorState, state, setState } = useContext(Context)
  const error = errorState[props.name]

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }
  const getStatusClass = (): string => {
    return error ? Styles.statusError : Styles.statusSuccess
  }
  const getTitle = (): string => {
    return error || 'Campo válido'
  }
  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false
  }
  return (
    <div className={Styles.inputWrap}>
      <input
        {...props}
        placeholder=" "
        data-testid={props.name}
        readOnly
        autoComplete="off"
        onFocus={enableInput}
        onChange={handleChange} />
        <label>{props.placeholder}</label>
      <span
        data-testid={`${props.name}-status`}
        title={getTitle()}
        className={getStatusClass()}
      ></span>
    </div>
  )
}

export default Input
