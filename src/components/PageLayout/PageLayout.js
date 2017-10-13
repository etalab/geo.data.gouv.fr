import React from 'react'
import { Helmet } from 'react-helmet'
import { translate } from 'react-i18next'
import PropTypes from 'prop-types'

import Header from '../../components/Header'
import NewsletterForm from '../Newsletter/NewsletterForm'
import Footer from '../../components/Footer'

import styles from './PageLayout.scss'

export const PageLayout = ({ children, i18n }) => (
  <div className={styles.content}>
    <Helmet
      titleTemplate='%s | geo.data.gouv.fr'
      defaultTitle='geo.data.gouv.fr'
      htmlAttributes={{ lang: i18n.language }}
    />
    <Header />
    <div className={styles.body}>
      {children}
    </div>
    <NewsletterForm />
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
