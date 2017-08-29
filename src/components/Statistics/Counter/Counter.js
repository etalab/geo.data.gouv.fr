import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import styles from './Counter.scss'

const Counter = ({ value, label, unit = '', size = '', color = '', icon = '', title = '' }) => {
  const labelSize = cx(styles.medium, {
    [styles.large]: size === 'large',
    [styles.small]: size === 'small'
  })

  const labelColor = cx(styles.medium, {
    [styles.success]: color === 'success',
    [styles.warning]: color === 'warning',
    [styles.error]: color === 'error'
  })

  const labelStyle = size === 'small' ? styles.small : styles.defaultLabel

  const titleDiv = title ? <h3>{title}</h3> : null
  const iconDiv = icon ? <i className={`${icon} icon`} /> : null
  const valueDiv = <div className={`${labelColor} ${labelSize}`}>{iconDiv} {value || '0'} {unit}</div>
  const labelDiv = label ? <div className={labelStyle}>{label}</div> : null

  return (
    <div className={styles.container}>
      { titleDiv }
      { valueDiv }
      { labelDiv }
    </div>
  )
}

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
