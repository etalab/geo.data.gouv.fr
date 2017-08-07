import React from 'react'
import PropTypes from 'prop-types'
import { translate, Interpolate } from 'react-i18next'

import NewsletterForm from '../Newsletter/NewsletterForm'
import SocialLinks from '../SocialLinks/SocialLinks'
import LanguageSelection from '../LanguageSelection/LanguageSelection'

import styles from './Footer.scss'

const Footer = ({ i18n }) => (
  <footer className={styles.footer} >
    <div className={styles.space} />
    <div className={styles.main}>
      <NewsletterForm />

      <div className={styles.info}>
        <Interpolate
          i18nKey='components.Footer.madeBy'
          heart={<span style={{ color: 'white' }}>♥</span>}
          link={<a style={{ color: 'white' }} href='https://www.etalab.gouv.fr/'>Etalab</a>}
        />
        <SocialLinks />
      </div>
      <LanguageSelection language={i18n.language} />
    </div>
  </footer>
)

Footer.propTypes = {
  i18n: PropTypes.shape({
    language: PropTypes.string.isRequired
  }).isRequired
}

export default translate('Common')(Footer)
