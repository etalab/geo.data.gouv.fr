import React, { Component } from 'react'

import User from '../../../../components/User/User'

import styles from './Publishing.css'

class Publishing extends Component {
  render() {
    const { user, organizationLogo, section } = this.props

    if (!user) return null

    return (
        <div className={styles.publishing}>
          <User user={user}/>

          {organizationLogo ? <img className={styles.organizationLogo} alt="organization logo" src={organizationLogo}></img> : null}

          {section}
        </div>
    )
  }
}

export default Publishing
