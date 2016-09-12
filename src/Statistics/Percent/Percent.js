import React from 'react'
import Statistics from '../Statistics'

const Percent = ({metrics, label, icon, size, description=""}) => {
  const value = metrics.partitions[label] ? metrics.partitions[label].yes : 0
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
      description={description}
      unit="%"
      icon={icon}
      color={color()}
      size={size} />
  )
}

export default Percent
