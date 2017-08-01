import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import { container, defaultLabel, large, medium, small, success, warning, error } from './Counter.scss'

const Counter = ({ value, label, unit = '', size = '', color = '', icon = '', title = '' }) => {
  const labelSize = cx(medium, {
    [large]: size === 'large',
    [small]: size === 'small',
  })

  const labelColor = cx(medium, {
    [success]: color === 'success',
    [warning]: color === 'warning',
    [error]: color === 'error',
  })

  const labelStyle = size === 'small' ? small : defaultLabel

  const titleDiv = title ? <h3>{title}</h3> : null
  const iconDiv = icon ? <i className={`${icon} icon`} /> : null
  const valueDiv = <div className={`${labelColor} ${labelSize}`}>{iconDiv} {value || '0'} {unit}</div>
  const labelDiv = label ? <div className={labelStyle}>{label}</div> : null

  return (
    <div className={container}>
      { titleDiv }
      { valueDiv }
      { labelDiv }
    </div>
  )
}

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  unit: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string
}

export default Counter
