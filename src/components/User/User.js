import React from 'react'
import { theme } from '../../tools'

const styles = {
  section: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    boxShadow: theme.boxShadowZ1,
    maxWidth: '200px',
  },
  img: {
    padding: '10px',
    maxHeight: '120px',
    maxWidth: '200px',
  },
  detail: {
    width: '100%',
    textAlign: 'center',
    padding: '1em',
    color: '#fff',
    fontSize: '1rem',
    backgroundColor: theme.blue,
  },
}

const User = ({ user, style }) => {
  const avatar = user.avatar ? {url: user.avatar, alt: user.slug} : {url: 'assets/avatar.png', alt: 'no avatar'}

  return (
    <div style={style}>
      <div style={styles.section}>
        <img style={styles.img} src={avatar.url} alt={avatar.alt} />
        <a style={styles.detail} href={user.page}>{user.first_name} {user.last_name}</a>
      </div>
    </div>
  )
}

export default User
