import React from 'react'
import { Link } from 'react-router'
import DocumentTitle from 'react-document-title'

import User from '../../../../components/User/User'

import styles from './Layout.css'


function Layout({ user, organization, pageTitle, title, children }) {
  if (!user) return null

  return (
    <DocumentTitle title={pageTitle}>
      <div className={styles.publishing}>
        <User user={user}/>
        {organization ?
          <Link to={`/publication/${organization.id}`}>
            <img className={styles.organizationLogo} alt="organization logo" src={organization.logo}></img>
          </Link> :
          null
          }
        <div className={styles.container}>
          <h3>{title}</h3>
          {children}
        </div>
      </div>
    </DocumentTitle>
  )
}

export default Layout
