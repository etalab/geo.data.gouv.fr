import React from 'react'
import PropTypes from 'prop-types'

import Link from '../link'

const Header = ({ user }) => (
  <div className='container'>
    <Link href='/publication'>
      <a className='avatar'>
        <img src={user.avatar || '/static/images/avatar.png'} alt='' />
      </a>
    </Link>

    <div className='infos'>
      <b>{user.first_name} {user.last_name}</b>
      <br />
      {user.email}
    </div>

    <style jsx>{`
      @import 'colors';
      .container {
        padding: 1em;
        background-color: $lightgrey;
        display: flex;
        align-items: center;
        border-radius: 2px;
      }

      a {
        display: block;
      }

      .avatar {
        width: 110px;
        height: 110px;
        display: flex;
        justify-content: center;
        overflow: hidden;
        border-radius: 50%;
        border: 2px solid $white;

        img {
          height: 100%;
        }
      }

      .infos {
        margin-left: 1em;
      }
    `}</style>
  </div>
)

Header.propTypes = {
  user: PropTypes.shape({
    avatar: PropTypes.string,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
  }).isRequired
}

export default Header
