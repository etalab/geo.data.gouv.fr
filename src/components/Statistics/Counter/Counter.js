import React from 'react'

const Counter = ({value, label, style, unit='', color='black', icon='', size='', description=''}) => {

  const styles = {
    label: {
      paddingTop: 2,
    }
  }
  return (
    <div style={style}>
      <div style={styles.label} className="label">{label}</div>
      <div className="value" style={{color}}>
        <i className={`${icon} icon`}></i> {value} {unit}
      </div>

      { description ? <p>{description}</p> : null }
    </div>
  )
}

export default Counter
