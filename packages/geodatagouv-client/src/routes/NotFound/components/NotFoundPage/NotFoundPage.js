import React from 'react'
import PropTypes from 'prop-types'

import { translate } from 'react-i18next'
import { Helmet } from 'react-helmet'

import styles from './NotFoundPage.scss'

const NotFoundPage = ({ t }) => (
  <div className={styles.notFound}>
    <Helmet title={t('NotFoundPage.error')} />
    <h1>404</h1>
    <p>{t('NotFoundPage.notFound')}</p>
  </div>
)

NotFoundPage.propTypes = {
  t: PropTypes.func.isRequired
}

export default translate('NotFound')(NotFoundPage)
