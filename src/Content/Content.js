import React, { Component } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

class Content extends Component {
  constructor(props) {
    super(props)
    this.state = {open: false}
    this.handleToggle = this.handleToggle.bind(this)
  }

  handleToggle() {
    this.setState({open: !this.state.open})
  }

  handleClose() {
    this.setState({open: false})
  }

  render() {
    const style = {
      position: 'relative',
      paddingBottom: '100px',
      minHeight: '100%',
    }

    return (
      <div className="Content" style={style}>
        <Header location={this.props.location}/>
        {this.props.children}
        <Footer />
      </div>
    )
  }
}

export default Content
