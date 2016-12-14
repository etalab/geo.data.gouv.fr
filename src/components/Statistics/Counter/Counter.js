import React from 'react'
import { counterTitle, smallLabel, largeLabel } from './Counter.css'


const Counter = ({value, label, style, unit='', size='', color='black', icon='', title=''}) => {
  let iconDiv
  let labelDiv
  let titleDiv
  let valueDiv

  const labelSize = (size === 'large') ? largeLabel : smallLabel

  if (icon) {
    iconDiv = <i className={`${icon} icon`}></i>
  }

  if (label) {
    labelDiv = <div className={labelSize}>{label}</div>
  }

  if (title) {
    title = <h3 style={style.title} className={counterTitle}>{title}</h3>
  }

  if (value) {
    valueDiv = <div style={{color}} className={labelSize}>{iconDiv} {value} {unit}</div>
  } else {
    valueDiv = <div style={{color}} className={labelSize}>{iconDiv} 0 {unit}</div>
  }

  return (
    <div style={style}>
      { titleDiv }
      { valueDiv }
      { labelDiv }
    </div>
  )
}

export default Counter
