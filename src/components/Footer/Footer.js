import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { translate } from 'react-i18next'

import Container from '../Container'

import styles from './Footer.scss'

const Footer = ({ t }) => (
  <footer className={styles.footer}>
    <Container>
      <div className={styles.container}>
        <div>
          <img src='/assets/etalab.png' />
          <ul className={styles.footerSocial}>
            <li><a href='https://twitter.com/geodatagouv'><img src='/assets/socials/twitter.svg' alt='Twitter' /></a></li>
            <li><a href='https://github.com/etalab/geo.data.gouv.fr'><img src='/assets/socials/github.svg' alt='Github' /></a></li>
            <li><a href='https://medium.com/geo-data-gouv-fr'><img src='/assets/socials/medium.svg' alt='Medium' /></a></li>
            <li><a href='mailto:geo@data.gouv.fr'><img src='/assets/socials/envelop.svg' alt='Contact' /></a></li>
          </ul>
        </div>
        <div>
          <ul className={styles.footerLinks}>
            <li><h2>geo.data.gouv.fr</h2></li>
            <li>
              <Link to='/legal'>{t('components.Footer.legal')}</Link>
            </li>
          </ul>
        </div>
      </div>
    </Container>
  </footer>
)

Footer.propTypes = {
  t: PropTypes.func.isRequired
}

export default translate('Common')(Footer)
