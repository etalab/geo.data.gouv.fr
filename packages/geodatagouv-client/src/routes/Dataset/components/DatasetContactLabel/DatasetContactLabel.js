import React from 'react'
import { translate } from 'react-i18next'
import PropTypes from 'prop-types'

import styles from './DatasetContactLabel.scss'

const DatasetContactLabel = ({ role, t }) => (
  <div className={`${styles.label} ${styles[role] || styles.notDefined}`}>
    {t([`components.DatasetContactLabel.${role}`, 'components.DatasetContactLabel.notDefined'])}
  </div>
)

DatasetContactLabel.propTypes = {
  role: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired
}

export default translate('Dataset')(DatasetContactLabel)
