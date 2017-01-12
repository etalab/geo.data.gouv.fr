import React from 'react'
import cx from 'classnames'
import { container, defaultLabel, large, medium, small, success, warning, error } from './Counter.css'


const Counter = ({value, label, unit='', size='', color='', icon='', title=''}) => {
  const labelSize = cx(medium, {
    [large]: size === 'large',
    [small]: size === 'small',
  });

  const labelColor = cx(medium, {
    [success]: color === 'success',
    [warning]: color === 'warning',
    [error]: color === 'error',
  });

  console.log(size === 'small')
  const labelStyle = size === 'small' ? small : defaultLabel

  const titleDiv = title ? <h3>{title}</h3> : null
  const iconDiv = icon ? <i className={`${icon} icon`}></i> : null
  const valueDiv = <div className={`${labelColor} ${labelSize}`}>{iconDiv} {value ? value : '0'} {unit}</div>
  const labelDiv = label ? <div className={labelStyle}>{label}</div> : null

  return (
    <div className={container}>
      { titleDiv }
      { valueDiv }
      { labelDiv }
    </div>
  )
}

export default Counter
