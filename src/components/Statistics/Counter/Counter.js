import React from 'react'
import PropTypes from 'prop-types'

import styles from './Counter.scss'

const Counter = ({ value, label, unit = '', size = '', color = '', icon = '', title = '' }) => (
  <div className={styles.container}>
    { title && <h3>{title}</h3> }
    <div className={`${styles.value} ${styles[color]} ${styles[size]}`}>
      {value || '0'} <div className={styles.unit}>{unit}</div>
    </div>
    <div className={styles.label}>
      { label && <div className={`${styles[size]}`}>{label} </div> }{icon && <i className={`${icon} icon`} />}
    </div>
  </div>
)

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  label: PropTypes.string,
  unit: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string
}

export default Counter
