import React, { Component } from 'react'
import cx from 'classnames'
import { selected, button } from './Formats.css'

class Formats extends Component {
  handleClick(format) {
    this.props.changeFormat(format)
  }

  render() {
    const { formats, active, changeFormat } = this.props

    return (
      <div>
        {formats.map((format, idx) => {
          const style = cx(button, {
            [selected]: format === active,
          })

          return <button key={idx} className={style} onClick={() => changeFormat && changeFormat(format)}>{format.label}</button>
        })}
      </div>
    )
  }
}

export default Formats
