import React from 'react'
import Statistics from '../Statistics/Statistics'

const Percent = ({metrics, label, icon, size}) => {
  const value = metrics.partitions[label].yes
  const percent = value ? Math.floor((value / metrics.totalCount) * 100) : 0
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
      label={label}
      unit="%"
      icon={icon}
      color={color()}
      size={size} />
  )
}

export default Percent
