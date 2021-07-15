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

  const getStatus = (): string => {
    return error ? 'invalid' : 'valid'
  }

  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false
  }
  return (
    <div
      data-testid={`${props.name}-wrap`}
      className={Styles.inputWrap}
      data-status={getStatus()}
    >
      <input
        {...props}
        placeholder=" "
        title={error}
        data-testid={props.name}
        readOnly
        autoComplete="off"
        onFocus={enableInput}
        onChange={handleChange} />
        <label data-testid={`${props.name}-label`}>{props.placeholder}</label>
    </div>
  )
}

export default Input
