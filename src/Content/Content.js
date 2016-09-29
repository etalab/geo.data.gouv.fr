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
    const styles = {
      content: {
        flexDirection: 'column',
        display: 'flex',
        position: 'relative',
        minHeight: '100vh',
      },
      body: {
        flex: 1,
      }
    }

    return (
      <div className="Content" style={styles.content}>
        <Header location={this.props.location}/>
        <div style={styles.body}>
          {this.props.children}          
        </div>
        <Footer />
      </div>
    )
  }
}

export default Content
