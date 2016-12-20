import React from 'react'
import { section, img, detail } from './User.css'

const User = ({ user }) => {
  const avatar = user.avatar ? {url: user.avatar, alt: user.slug} : {url: 'assets/avatar.png', alt: 'no avatar'}

  return (
    <div className={section}>
      <img className={img} src={avatar.url} alt={avatar.alt} />
      <a className={detail} href={user.page}>{user.first_name} {user.last_name}</a>
    </div>
  )
}

export default User
