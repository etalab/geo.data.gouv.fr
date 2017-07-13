import React from 'react'
import { Link } from 'react-router'

import { section, img, detail } from './User.scss'

const User = ({ user }) => {
  const avatar = user.avatar ? {url: user.avatar, alt: user.slug} : {url: 'assets/avatar.png', alt: 'no avatar'}

  return (
    <div className={section}>
      <Link className={detail} to='/publication'>
        <img className={img} src={avatar.url} alt={avatar.alt} />
        <div>{user.first_name} {user.last_name}</div>
      </Link>
    </div>
  )
}

export default User
