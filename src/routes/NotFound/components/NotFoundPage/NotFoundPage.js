import React from 'react'
import PropTypes from 'prop-types'

import { translate } from 'react-i18next'
import { Helmet } from 'react-helmet'

import styles from './NotFoundPage.scss'

const NotFoundPage = ({ t }) => (
  <div>
    <Helmet title={t('NotFoundPage.error')} />
    <div className={styles.notFound}>
      <h1>404</h1>
      <p>{t('NotFoundPage.notFound')}</p>
    </div>
  </div>
)

NotFoundPage.propTypes = {
  t: PropTypes.func.isRequired
}

export default translate('NotFound')(NotFoundPage)
