import React, { Component } from 'react'

const styles = {
  user: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: '1em',
  },
  img: {
    padding: '10px',
    maxHeight: '120px',
    maxWidth: '200px',
  },
}

class User extends Component {
  render() {
    const { user } = this.props
    const avatar = user.avatar ? {url: user.avatar, alt: user.slug} : {url: 'assets/avatar.png', alt: 'no avatar'}

    return (
      <div style={styles.user}>
        <img style={styles.img} src={avatar.url} alt={avatar.alt} />
        <a href={user.page}>{user.first_name} {user.last_name}</a>
      </div>
    )
  }
}

export default User
