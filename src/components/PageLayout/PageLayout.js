import React from 'react'
import { Helmet } from 'react-helmet'
import { translate } from 'react-i18next'
import PropTypes from 'prop-types'

import Header from '../../components/Header'
import Footer from '../../components/Footer'

import styles from './PageLayout.scss'
import clouds from './images/clouds.svg'

export const PageLayout = ({ children, i18n }) => (
  <div className={styles.content}>
    <Helmet
      titleTemplate='%s | inspire.data.gouv.fr'
      defaultTitle='inspire.data.gouv.fr'
      htmlAttributes={{ lang: i18n.language }}
    />
    <Header />
    <div className={styles.body} style={`background: url(${clouds}) bottom / 100% no-repeat, linear-gradient(to top, #41dcd7, #3083b2)`}>
      {children}
    </div>
    <Footer />
  </div>
)

PageLayout.propTypes = {
  children: PropTypes.node,
  i18n: PropTypes.shape({
    language: PropTypes.string.isRequired
  }).isRequired
}

export default translate()(PageLayout)
