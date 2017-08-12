import React from 'react'
import { StickyContainer } from 'react-sticky'
import PropTypes from 'prop-types'

import Header from '../../components/Header'
import Footer from '../../components/Footer'

import styles from './PageLayout.scss'

export const PageLayout = ({ children }) => (
  <StickyContainer className={styles.content}>
    <Header />
    <div className={styles.body}>
      {children}
    </div>
    <Footer />
  </StickyContainer>
)

PageLayout.propTypes = {
  children: PropTypes.node,
}

export default PageLayout
