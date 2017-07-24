import React, { Component } from 'react'
import { translate, Trans } from 'react-i18next'

import NewsletterForm from '../Newsletter/NewsletterForm'
import SocialLinks from '../SocialLinks/SocialLinks'
import LanguageSelection from '../LanguageSelection/LanguageSelection'

import { footer, space, main, info } from './Footer.scss'

function Link({ to, children }) {
  return <a style={{ color: 'white' }} href={to}>{children}</a>
}

function Span({ children }) {
  return <span style={{ color: 'white' }}>{children}</span>
}

class Footer extends Component {
  render() {
    const { i18n } = this.props
    return (
      <footer className={footer} >
        <div className={space}></div>
        <div className={main}>
          <NewsletterForm />

          <div className={info}>
            <Trans>
              Made with <Span>♥</Span> by <Link to='https://www.etalab.gouv.fr/'>Etalab</Link>
            </Trans>
            <SocialLinks />
          </div>
          <LanguageSelection language={i18n.language}/>
        </div>
      </footer>
    )
  }
}

export default translate('Footer')(Footer)
