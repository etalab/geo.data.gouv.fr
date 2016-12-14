import React, { Component } from 'react'
import { footer } from './Footer.css'

class Footer extends Component {
  render() {
    return (
      <footer className={footer} >
        <p>Fait avec <span style={{ color: 'white' }}>♥</span> par <a style={{ color: 'white' }} href="https://beta.gouv.fr">l'Incubateur de Services Numériques</a></p>
      </footer>
    )
  }
}

export default Footer
