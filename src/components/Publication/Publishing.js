import React from 'react'
import User from '../User/User'
import styles from './Publishing.css'

const Publishing = ({ user, section, organization = null}) => {
  if (!user) return null

  return (
    <div className={styles.publishing}>
      <User style={{marginBottom: '1em'}} user={user}/>

      {organization ? <User user={user}/> : null}

      {section}
    </div>
  )
}

export default Publishing
