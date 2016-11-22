import React, { Component } from 'react'
import { theme } from '../../tools'

class Footer extends Component {
  render() {
    const style = {
      padding: 40,
      textAlign: 'center',

      color: theme.blue,
      backgroundColor: theme.darkblue,
    }
    return (
      <footer style={style} >
        <p>Fait avec <span style={{ color: 'white' }}>♥</span> par <a style={{ color: 'white' }} href="https://beta.gouv.fr">l'Incubateur de Services Numériques</a></p>
      </footer>
    )
  }
}

export default Footer
