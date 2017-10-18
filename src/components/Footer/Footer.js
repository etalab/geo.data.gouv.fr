import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

import styles from './Footer.scss'

const Footer = ({ t }) => (
  <footer className={styles.footer}>
    <div className={styles.container}>
      <div className={styles.footerLogo}>
        <img src='assets/etalab.png' />
        <ul className={styles.footerSocial}>
          <li><a href='https://twitter.com/geodatagouv'><img src='assets/socials/twitter.svg' alt='Twitter' /></a></li>
          <li><a href='https://github.com/etalab/geo.data.gouv.fr'><img src='assets/socials/github.svg' alt='Github' /></a></li>
          <li><a href='https://medium.com/geo-data-gouv-fr'><img src='assets/socials/medium.svg' alt='Medium' /></a></li>
          <li><a href='mailto:geo@data.gouv.fr'><img src='assets/socials/envelop.svg' alt='Contact' /></a></li>
        </ul>
      </div>
      <div className={styles.footerLogo}>
        <ul className={styles.footerLinks}>
          <li><h2>geo.data.gouv.fr</h2></li>
          <li>{t('components.Footer.terms')}</li>
        </ul>
      </div>
    </div>
  </footer>
)

Footer.propTypes = {
  t: PropTypes.func.isRequired
}

export default translate('Common')(Footer)
