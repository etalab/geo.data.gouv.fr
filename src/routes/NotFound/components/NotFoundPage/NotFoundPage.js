import React from 'react'
import { translate } from 'react-i18next'
import DocumentTitle from 'react-document-title'

import styles from './NotFoundPage.scss'

const NotFoundPage = ({ t }) => (
  <DocumentTitle title={'Erreur 404'}>
    <div className={styles.notFound}>
      <h1>404</h1>
      <p>{t('NotFoundPage.notFound')}</p>
    </div>
  </DocumentTitle>
)

export default translate('NotFound')(NotFoundPage)
