import React from 'react'
import cx from 'classnames'
import { container, defaultLabel, largeLabel, successLabel, warningLabel, errorLabel } from './Counter.css'


const Counter = ({value, label, unit='', size='', color='', icon='', title=''}) => {
  const labelStyle = cx(defaultLabel, {
    [largeLabel]: size === 'large',
    [successLabel]: color === 'success',
    [warningLabel]: color === 'warning',
    [errorLabel]: color === 'error',
  });

  const labelDiv = label ? <div className={labelStyle}>{label}</div> : null
  const titleDiv = title ? <h3>{title}</h3> : null
  const iconDiv = icon ? <i className={`${icon} icon`}></i> : null
  const valueDiv = <div className={labelStyle}>{iconDiv} {value ? value : '0'} {unit}</div>

  return (
    <div className={container}>
      { titleDiv }
      { valueDiv }
      { labelDiv }
    </div>
  )
}

export default Counter
