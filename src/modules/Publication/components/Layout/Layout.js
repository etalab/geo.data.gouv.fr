import React from 'react'
import DocumentTitle from 'react-document-title'

import User from '../../../../components/User/User'

import styles from './Layout.css'


function Layout({ user, organizationLogo, pageTitle, title, children }) {
  if (!user) return null

  return (
    <DocumentTitle title={pageTitle}>
      <div className={styles.publishing}>
        <User user={user}/>
        {organizationLogo ? <img className={styles.organizationLogo} alt="organization logo" src={organizationLogo}></img> : null}
        <div className={styles.container}>
          <h3>{title}</h3>
          {children}
        </div>
      </div>
    </DocumentTitle>
  )
}

export default Layout
