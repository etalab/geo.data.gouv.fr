import React from 'react'
import Counter from '../Counter/Counter'

const Percent = ({value, total, label, icon, size, description=""}) => {
  const percent = value ? Math.floor((value / total) * 100) : 0
  const color = () => {
    if (percent < 20) {
      return 'red'
    } else if (percent > 55) {
      return 'green'
    } else {
      return 'yellow'
    }
  }

  return (
    <Counter
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
