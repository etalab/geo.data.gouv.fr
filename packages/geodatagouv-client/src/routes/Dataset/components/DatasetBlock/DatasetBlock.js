import React from 'react'
import PropTypes from 'prop-types'

import styles from './DatasetBlock.scss'

const DatasetBlock = ({ title, children }) => (
  <div className={styles.container}>
    <h3 className={styles.title}>{title}</h3>
    {children}
  </div>
)

DatasetBlock.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export default DatasetBlock
