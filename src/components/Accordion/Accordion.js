import React, { Component } from 'react'

const styles = {
  content: {
    margin: '1em',
  },
  msg: {
    fontSize: '0.8em'
  }
}

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
          { msg ? <div style={styles.msg}>{msg}</div> : null }
          <div style={styles.content}>{content}</div>
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
