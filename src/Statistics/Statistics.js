import React from 'react'

const Statistics = ({value, label, unit="", color="black", icon="", size="", description=""}) => {
  return (
    <div className={`ui ${size} ${color} statistic`}>
      <div className="value">
        <i className={`${icon} icon`}></i> {value} {unit}</div>
      <div className="label">{label}</div>
      <p>{description}</p>
    </div>
  )
}

export default Statistics
