import React, { Component } from 'react'
import { Sticky } from 'react-sticky'

import { sticky, closeIcon } from './Warning.css'

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
    const { children } = this.props

    if (close) return null

    return (
      <Sticky className={sticky}>
        {children}
        <div className={closeIcon} onClick={() => this.closeWarning()}><i className="big remove icon"></i></div>
      </Sticky>
    )
  }
}

export default Warning
