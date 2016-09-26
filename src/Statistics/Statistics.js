import React from 'react'

const Statistics = ({value, label, unit="", color="black", icon="", size="", description=""}) => {

  const styles = {
    label: {
      paddingTop: 4,
      paddingBottom: 4,
    }
  }
  return (
    <div className={`ui ${size} ${color} statistic`}>
      <div className="value">
        <i className={`${icon} icon`}></i> {value} {unit}</div>
      <div style={styles.label} className="label">{label}</div>
      <p>{description}</p>
    </div>
  )
}

export default Statistics
