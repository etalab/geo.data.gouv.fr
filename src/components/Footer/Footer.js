import React, { Component } from 'react'

import NewsletterForm from '../Newsletter/NewsletterForm'
import SocialLinks from '../SocialLinks/SocialLinks'

import { footer, space, main, info } from './Footer.css'

class Footer extends Component {
  render() {
    return (
      <footer className={footer} >
        <div className={space}></div>
        <div className={main}>
          <NewsletterForm />

          <div className={info}>
            <p>Fait avec <span style={{ color: 'white' }}>♥</span> par <a style={{ color: 'white' }} href="https://beta.gouv.fr">l'Incubateur de Services Numériques</a></p>

            <SocialLinks />
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer
