import React, { Component } from 'react'

import EventBriteWidget from '../Workshop/EventBriteWidget'
import NewsletterForm from '../Newsletter/NewsletterForm'

import { footer } from './Footer.css'

class Footer extends Component {
  render() {
    return (
      <footer className={footer} >
        <h2>Actualités</h2>
        <EventBriteWidget />
        <NewsletterForm />
        <p>Fait avec <span style={{ color: 'white' }}>♥</span> par <a style={{ color: 'white' }} href="https://beta.gouv.fr">l'Incubateur de Services Numériques</a></p>
      </footer>
    )
  }
}

export default Footer
