import React from 'react'
import PropTypes from 'prop-types'

import styles from './DatasetProducer.scss'

const DatasetProducer = ({ organization }) => (
  <div className={styles.container}>
    <img src={organization.logo} alt='producer logo' />
    <h4>{organization.name}</h4>
  </div>
)

DatasetProducer.propTypes = {
  organization: PropTypes.shape({
    name: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired
  }).isRequired
}

export default DatasetProducer
