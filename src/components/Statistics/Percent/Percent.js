import React from 'react'
import Counter from '../Counter/Counter'
import { theme } from '../../../tools'

const Percent = ({value, total, label, icon, size, style, description=''}) => {
  const percent = value ? Math.floor((value / total) * 100) : 0
  const color = () => {
    if (percent < 20) {
      return theme.red
    } else if (percent > 55) {
      return theme.green
    } else {
      return theme.yellow
    }
  }

  return (
    <Counter
      style={style}
      value={percent}
      label={label}
      description={description}
      unit="%"
      icon={icon}
      color={color()}
      size={size} />
  )
}

export default Percent
