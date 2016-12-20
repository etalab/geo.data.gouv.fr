import React, { Component } from 'react'
import style from './Accordion.css'

class Accordion extends Component {
  constructor(props) {
    super(props)
    this.state = { showContent: false }
  }

  onClick() {
    this.setState({ showContent: !this.state.showContent })
  }

  render() {
    const { title, content, msg } = this.props
    const details =
        <div>
          { msg ? <div className={style.msg}>{msg}</div> : null }
          <div className={style.content}>{content}</div>
        </div>

    return (
      <div>
        <div onClick={() => this.onClick()}>{title}</div>
        { this.state.showContent ? details : null }
      </div>
    )
  }
}

export default Accordion
