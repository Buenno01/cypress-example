import React, { Fragment } from 'react'
import Styles from './survey-item-empty-styles.scss'

const SurveyItemEmpty: React.FC = () => {
  return (
    <Fragment>
      <li className={Styles.surveyItemEmpty}></li>
      <li className={Styles.surveyItemEmpty}></li>
      <li className={Styles.surveyItemEmpty}></li>
    </Fragment>
  )
}

export default SurveyItemEmpty
