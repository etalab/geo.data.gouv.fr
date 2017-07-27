import React, { Component } from 'react'
import { translate, Interpolate } from 'react-i18next'

import NewsletterForm from '../Newsletter/NewsletterForm'
import SocialLinks from '../SocialLinks/SocialLinks'
import LanguageSelection from '../LanguageSelection/LanguageSelection'

import { footer, space, main, info } from './Footer.scss'

class Footer extends Component {
  render() {
    const { i18n } = this.props
    return (
      <footer className={footer} >
        <div className={space}></div>
        <div className={main}>
          <NewsletterForm />

          <div className={info}>
            <Interpolate
              i18nKey='Footer.madeBy'
              heart={<span style={{ color: 'white' }}>♥</span>}
              link={<a style={{ color: 'white' }} href='https://www.etalab.gouv.fr/'>Etalab</a>}
            />
            <SocialLinks />
          </div>
          <LanguageSelection language={i18n.language}/>
        </div>
      </footer>
    )
  }
}

export default translate('Common')(Footer)
