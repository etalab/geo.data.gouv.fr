import React, { Component } from 'react'

class Accordion extends Component {
  constructor(props) {
    super(props)
    this.state = {active: props.active ? props.active : false}
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState({active: !this.state.active})
  }

  render() {
    return (
      <div>
        <div className={`${this.state.active ? 'active' : '' } title`} onClick={this.handleClick} >
          {this.props.title}
        </div>
        <div className={`${this.state.active ? 'active' : '' } content`}>
          <div className="ui divider"></div>
          {this.props.content}
        </div>
      </div>
    )
  }
}

export default Accordion
