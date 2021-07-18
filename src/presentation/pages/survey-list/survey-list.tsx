import { Footer, Header, Icon, IconName } from '@/presentation/components'
import React from 'react'
import Styles from './survey-list-styles.scss'

const SurveyList: React.FC = () => {
  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <ul>
          <li>
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
          <li>
            <div className={Styles.surveyContent}>
              <Icon className={Styles.iconWrap} iconName={IconName.thumbDown} />
              <time>
                <span className={Styles.day}>15</span>
                <span className={Styles.month}>07</span>
                <span className={Styles.year}>2021</span>
              </time>
              <p>Imposto é roubo?</p>
            </div>
            <footer>Ver Resultado</footer>
          </li>
          <li>
            <div className={Styles.surveyContent}>
              <Icon className={Styles.iconWrap} iconName={IconName.thumbDown} />
              <time>
                <span className={Styles.day}>15</span>
                <span className={Styles.month}>07</span>
                <span className={Styles.year}>2021</span>
              </time>
              <p>Imposto é roubo?</p>
            </div>
            <footer>Ver Resultado</footer>
          </li>
        </ul>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
