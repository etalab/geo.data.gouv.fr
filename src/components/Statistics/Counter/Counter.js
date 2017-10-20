import React from 'react'
import PropTypes from 'prop-types'

import styles from './Counter.scss'

const Counter = ({ value, label, unit = '', size = '', color = '', title = '' }) => (
  <div className={styles.container}>
    {title && <h3>{title}</h3>}
    <div className={`${styles.value} ${styles[color]}`}>
      {value || 0}{unit && <span className={styles.unit}>{unit}</span>}
    </div>
    {label && <div className={styles[size]}>{label}</div>}
  </div>
)

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  label: PropTypes.string,
  unit: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.string,
  title: PropTypes.string
}

export default Counter
