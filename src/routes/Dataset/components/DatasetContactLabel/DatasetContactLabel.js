import React from 'react'
import { translate } from 'react-i18next'
import PropTypes from 'prop-types'

import styles from './DatasetContactLabel.scss'

const DatasetContactLabel = ({ role, t }) => (
  <div className={`${styles.label} ${styles[role]}`}>
    {t(`DatasetContactLabel.${role}`)}
  </div>
)

DatasetContactLabel.propTypes = {
  role: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired
}

export default translate('Dataset')(DatasetContactLabel)
