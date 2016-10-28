import React, { Component } from 'react'

class Section extends Component {
  constructor(props) {
    super(props)
    this.state = {open: true}
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState({open: !this.state.open})
  }

  render() {
    const expandIcon = this.state.open ?  <span>v</span> : <span>></span>
    const styles = {
      section: {
        paddingTop: '2em',
        paddingBottom: '2em',
      },
      header: {
        display: 'flex',
        justifyContent: 'space-between'
      },
      component: {
        padding: 20,
        display: this.state.open ? '' : 'none',
      }
    }

    return (
      <div style={styles.section}>
        <div style={styles.header}>
          <h3>{this.props.title}</h3>
          <button onClick={this.handleClick}>
            {expandIcon}
          </button>
        </div>
        <hr />
        <div style={styles.component}>
          {this.props.component}
        </div>
      </div>
      )
  }

}

export default Section
