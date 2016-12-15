import React from 'react'
import User from '../User/User'

const styles = {
  publishing: {
    padding: '60px 40px',
    display: 'block',
  },
  section: {
    maxWidth: '200px',
    position: 'absolute',
    top: '90px',
    left: '44%',
  },
  header: {
    marginBottom: '1em',
    padding: '1em',
    fontSize: '1.5rem',
    color: 'black',
  },
  organization: {

  }
}

const Publishing = ({ user, section, organization = null}) => {
  if (!user) return null
  return (
    <div style={styles.publishing}>
      <User style={{marginBottom: '1em'}} user={user}/>
      {organization ? <User style={styles.organization} user={user}/> : null}
      <div style={{marginBottom: '3em'}}>
        {section}
      </div>
    </div>
  )
}

export default Publishing
