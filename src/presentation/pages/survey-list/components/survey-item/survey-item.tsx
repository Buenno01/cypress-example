import { Icon, IconName } from '@/presentation/components'
import React from 'react'
import Styles from './survey-item-styles.scss'

const SurveyItem: React.FC = () => {
  return (
    <li className={Styles.surveyItemWrap}>
      <div className={Styles.surveyContent}>
        <Icon className={Styles.iconWrap} iconName={IconName.thumbDown} />
        <time>
          <span className={Styles.day}>15</span>
          <span className={Styles.month}>07</span>
          <span className={Styles.year}>2021</span>
        </time>
        <p>Imposto é roubo?Imposto é roubo?Imposto é roubo?Imposto é roubo?Imposto é roubo?Imposto é roubo?Imposto é roubo? Imposto é roubo?Imposto é roubo?Imposto é roubo?</p>
      </div>
      <footer>Ver Resultado</footer>
    </li>
  )
}

export default SurveyItem
