import React from 'react'
import PropTypes from 'prop-types'

import { translateRole } from './roles'

import styles from './DatasetContactLabel.scss'

const DatasetContactLabel = ({ role }) => (
  <div className={`${styles.label} ${styles[role]}`}>
    {translateRole(role)}
  </div>
)

DatasetContactLabel.propTypes = {
  role: PropTypes.string.isRequired
}

export default DatasetContactLabel
