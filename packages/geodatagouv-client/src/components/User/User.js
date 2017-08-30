import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import styles from './User.scss'

const User = ({ user }) => {
  const avatar = user.avatar ? {
    url: user.avatar,
    alt: user.slug
  } : {
    url: 'assets/avatar.png',
    alt: 'no avatar'
  }

  return (
    <div className={styles.section}>
      <Link className={styles.detail} to='/publication'>
        <img className={styles.img} src={avatar.url} alt={avatar.alt} />
        <div>
          {user.first_name} {user.last_name}
        </div>
      </Link>
    </div>
  )
}

User.propTypes = {
  user: PropTypes.shape({
    avatar: PropTypes.string,
    slug: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string
  }).isRequired
}

export default User
