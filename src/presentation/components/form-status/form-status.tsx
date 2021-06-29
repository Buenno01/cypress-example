import React, { useContext } from 'react'
import Styles from './form-status-styles.scss'
import Loader from '@/presentation/components/loader/loader'
import Context from '@/presentation/contexts/form/form-context'

const FormStatus: React.FC = () => {
  const { state, errorState } = useContext(Context)
  const { isLoading } = state
  const { main } = errorState
  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      { isLoading && <Loader className={Styles.loader} /> }
      { main && <span data-testid="main-error" className={Styles.error}>{ main }</span> }
    </div>
  )
}

export default FormStatus
