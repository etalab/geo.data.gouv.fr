import React from 'react'
import PropTypes from 'prop-types'

import styles from './DatasetBlock.scss'

const DatasetBlock = ({ title, children }) => (
  <div className={styles.container}>
    { title && <h3 className={styles.title}>{title}</h3>}
    {children}
  </div>
)

DatasetBlock.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired
}

export default DatasetBlock
