import React from 'react'
import Statistics from '../Statistics'

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
    <Statistics
      value={percent}
      label={label === 'openness' ? 'open data' : label}
      description={description}
      unit="%"
      icon={icon}
      color={color()}
      size={size} />
  )
}

export default Percent
