import React from 'react'

const Percent = ({metrics, label, icon}) => {
  const value = metrics.partitions[label].yes
  const percent = value ? Math.floor((value / metrics.totalCount) * 100) : 0
  const color = () => {
    if (percent < 25) {
      return 'red'
    } else if (percent > 75) {
      return 'green'
    } else {
      return 'yellow'
    }
  }

  return (
    <div className={`ui ${color()} statistic`}>
        <div className="value"><i className={`${icon} icon`}></i> {percent}% </div>
        <div className="label">{label} </div>
      </div>
  )
}

export default Percent
