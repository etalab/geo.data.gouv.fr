import React from 'react'

const defaultStyle = {
  large: {
    fontSize: '4rem',
    lineHeight: '4rem',
  }
}

const Counter = ({value, label, style, unit='', size='', color='black', icon='', description=''}) => {
  let styles = {...style, ...defaultStyle}
  let iconDiv = null

  if (size === 'large') {

  }

  if (icon) {
    iconDiv = <i className={`${icon} icon`}></i>
  }

  return (
    <div style={style}>
      { label ? <div style={styles.label} className="label">{label}</div> : null }
      { description ? <h3>{description}</h3> : null }

      <div style={{...styles[size], color}}>
        {iconDiv} {value} {unit}
      </div>

    </div>
  )
}

export default Counter
