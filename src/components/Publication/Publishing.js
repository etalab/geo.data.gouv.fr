import React, { Component } from 'react'
import User from '../User/User'
import styles from './Publishing.css'

class Publishing extends Component {
  render() {
    const { user, organization, section } = this.props

    if (!user) return null

    return (
      <div className={styles.publishing}>
        <User user={user}/>

        {organization ? <img className={styles.organizationLogo} alt="organization logo" src={organization.logo}></img> : null}

        {section}
      </div>
    )
  }
}

export default Publishing
