import React from 'react'

const defaultStyle = {
  label: {
    paddingTop: 2,
  }
}

const Counter = ({value, label, style, unit='', color='black', icon='', size='', description=''}) => {
  const styles = {...style, ...defaultStyle}

  return (
    <div style={style}>
      <div style={styles.label} className="label">{label}</div>
      <div style={{...styles.value, color}}>
        <i className={`${icon} icon`}></i> {value} {unit}
      </div>

      { description ? <p>{description}</p> : null }
    </div>
  )
}

export default Counter
