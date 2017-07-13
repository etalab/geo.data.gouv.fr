import React, { Component } from 'react'
import { Sticky } from 'react-sticky'

import { sticky, content, bold, warning, errorStyle, closeIcon } from './Warning.scss'

class Warning extends Component {
  constructor(props) {
    super(props)
    this.state = { close: false }
  }

  closeWarning() {
    this.setState({close: true})
  }

  render() {
    const { close } = this.state
    const { error, title, children } = this.props
    const color = error ? errorStyle : warning

    if (close) return null

    return (
      <Sticky className={`${sticky} ${color}`}>
        <div className={content}>
          <div className={bold}>{title}</div>
          {children}
        </div>
        <div className={closeIcon} onClick={() => this.closeWarning()}><i className="big remove icon"></i></div>
      </Sticky>
    )
  }
}

export default Warning
