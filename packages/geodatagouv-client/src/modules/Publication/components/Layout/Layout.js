/* eslint-disable react/prop-types */

import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import User from '../../../../components/User/User'

import styles from './Layout.scss'

function Layout({ user, organization, pageTitle, title, children }) {
  if (!user) return null
  const organizationLogo = organization && organization.logo ? organization.logo : '/assets/no-img.png'

  return (
    <div className={styles.publishing}>
      <Helmet title={pageTitle} />
      <User user={user} />
      {organization
        ? <Link to={`/publication/${organization.id}`}>
          <img className={styles.organizationLogo} alt='organization logo' src={organizationLogo} />
        </Link>
        : null
      }
      <div className={styles.container}>
        <h3>{title}</h3>
        {children}
      </div>
    </div>
  )
}

export default Layout
