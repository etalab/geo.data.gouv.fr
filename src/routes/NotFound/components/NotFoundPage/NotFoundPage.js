import React from 'react'
import DocumentTitle from 'react-document-title'

import styles from './NotFoundPage.scss'

const NotFoundPage = () => (
  <DocumentTitle title={'Erreur 404'}>
    <div className={styles.notFound}>
      <h1>404</h1>
      <p>Page non trouvée</p>
    </div>
  </DocumentTitle>
)

export default NotFoundPage
