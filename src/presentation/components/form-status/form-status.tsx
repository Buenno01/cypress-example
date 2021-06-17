import React, { useContext } from 'react'
import Styles from './form-status-styles.scss'
import Loader from '@/presentation/components/loader/loader'
import Context from '@/presentation/contexts/form/form-context'

const FormStatus: React.FC = () => {
  const { isLoading, errorMessage } = useContext(Context)
  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      { isLoading && <Loader className={Styles.loader} /> }
      { errorMessage && <span className={Styles.error}>{ errorMessage }</span> }
    </div>
  )
}

export default FormStatus
