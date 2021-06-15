import React from 'react'
import Styles from './form-status-styles.scss'
import Loader from '@/presentation/components/loader/loader'

type Props = {
  error: string
}

const FormStatus: React.FC<Props> = (props: Props) => {
  return (
    <div className={Styles.errorWrap}>
      <Loader className={Styles.loader} />
      <span className={Styles.error}>{ props.error }</span>
    </div>
  )
}

export default FormStatus
