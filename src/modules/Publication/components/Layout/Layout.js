/* eslint-disable react/prop-types */

import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import User from '../../../../components/User/User'

import styles from './Layout.scss'
import clouds from '../../../../components/PageLayout/images/clouds.svg'

function Layout({ user, organization, pageTitle, title, children }) {
  if (!user) return null
  const organizationLogo = organization && organization.logo ? organization.logo : '/assets/no-img.png'

  return (
    <div className={styles.publishing}>
      <Helmet title={pageTitle} />
      <div className={styles.header} style={{ background: `url(${clouds}) bottom / 101% no-repeat, linear-gradient(to top, #41dcd7, #3083b2)` }}>
        <User user={user} />
      </div>
      {organization && (
        <Link className={styles.organizationLogo} to={`/publication/${organization.id}`} style={{ 'background-image': `url(${organizationLogo})` }} />
      )}
      <div className={styles.container}>
        <h3>{title}</h3>
        {children}
      </div>
    </div>
  )
}

export default Layout
