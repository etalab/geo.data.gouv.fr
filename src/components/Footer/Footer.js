import React, { Component } from 'react'
import { theme } from '../../tools'

class Footer extends Component {
  render() {
    const style = {
      padding: 40,
      textAlign: 'center',

      color: theme.lightblue,
      backgroundColor: theme.blue,
    }
    return (
      <footer style={style} >
        <p>Made with <span style={{ color: 'white' }}>♥</span> by the <a style={{ color: 'white' }} href="https://beta.gouv.fr">Digital Services Incubator</a></p>
      </footer>
    )
  }
}

export default Footer
