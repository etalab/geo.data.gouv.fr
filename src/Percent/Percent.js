import React from 'react'

const Percent = ({metrics, label, icon}) => {
  const value = metrics.partitions[label].yes
  const percent = value ? Math.floor((value / metrics.totalCount) * 100) : 0

  return (
    <div className="ui statistic">
        <div className="value"><i className={`${icon} icon`}></i> {percent}% </div>
        <div className="label">{label} </div>
      </div>
  )
}

export default Percent
