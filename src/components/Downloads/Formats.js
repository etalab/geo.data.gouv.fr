import React, { Component } from 'react'
import { theme } from '../../tools'

const styles = {
  selected: {
    padding: '5px 10px',
    backgroundColor: theme.blue,
    color: '#fff',
    border: 'none',
    outline: 'none',
  },
  button: {
    margin: '1px',
    padding: '5px 10px',
    backgroundColor: '#ddd',
    border: 'none',
  },
}

class Formats extends Component {
  handleClick(format) {
    this.props.changeFormat(format)
  }

  render() {
    const { formats, active, changeFormat, style } = this.props

    return (
      <div style={style}>
        {formats.map((format, idx) => {
          let style = (format === active) ? styles.selected : styles.button
          return <button key={idx} style={style} onClick={() => changeFormat && changeFormat(format)}>{format.label}</button>
        })}
      </div>
    )
  }
}

export default Formats
