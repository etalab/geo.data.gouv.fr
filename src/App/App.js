import React, { Component } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import './App.css'

class App extends Component {
  render() {
    return (

      <div className="App">
        {this.props.children.props.location.pathname !== '/' ? <Header /> : null}
        {this.props.children}
        <Footer />
      </div>
    )
  }
}

export default App
