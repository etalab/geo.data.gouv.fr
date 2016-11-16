import React from 'react'

const defaultStyle = {
  large: {
    fontSize: '4rem',
    lineHeight: '4rem',
  },
  label: {
    large: {
      fontSize: '1.4em',
      fontWeight: '300',
    },
  },
  title: {
    textAlign: 'center',
  },
}

const Counter = ({value, label, style, unit='', size='', color='black', icon='', title=''}) => {
  let styles = {...style, ...defaultStyle}
  let iconDiv = null

  if (icon) {
    iconDiv = <i className={`${icon} icon`}></i>
  }

  return (
    <div style={style}>
      { title ? <h3 style={styles.title}>{title}</h3> : null }

      <div style={{...styles[size], color}}>
        {iconDiv} {value} {unit}
      </div>

      { label ? <div style={styles.label[size]} className="label">{label}</div> : null }

    </div>
  )
}

export default Counter
