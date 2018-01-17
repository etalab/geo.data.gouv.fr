import PropTypes from 'prop-types'

import Link from '../link'

const Header = ({user, organization}) => (
  <div className='container'>
    <Link href='/publication'>
      <a className='avatar'>
        <img src={user.avatar || '/static/images/avatar.png'} alt='' />
      </a>
    </Link>

    {organization && (
      <Link href={`/publication/organization?oid=${organization.id}`} as={`/publication/${organization.id}`}>
        <a className='organization'>
          <img
            src={organization.logo_thumbnail || '/static/images/no-img.png'}
            alt={organization.name}
            title={organization.name}
          />
        </a>
      </Link>
    )}

    <div className='infos'>
      <div>
        <b>{user.first_name} {user.last_name}</b>
      </div>
      <div>
        {user.email}
      </div>
    </div>

    <style jsx>{`
      @import 'colors';
      .container {
        padding: 1em 1.2em;
        background-color: $lightgrey;
        display: flex;
        align-items: center;
        border-radius: 2px;
        position: relative;

        @media (max-width: 768px) {
          flex-direction: column;
        }
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
        background-color: $white;
        border: 2px solid transparent;
        flex-shrink: 0;

        img {
          height: 100%;
        }
      }

      .organization {
        position: absolute;
        left: calc(1.2em + 70px);
        top: calc(1em + 60px);
        width: 50px;
        height: 50px;
        display: flex;
        justify-content: center;
        overflow: hidden;
        border-radius: 50%;
        background-color: $white;
        border: 1px solid $darkblue;
        box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.25);

        @media (max-width: 768px) {
          left: calc(50% + 15px);
        }

        img {
          height: 100%;
        }
      }

      .infos {
        margin-left: 1.2em;

        @media (max-width: 768px) {
          text-align: center;
          margin-left: 0;
          margin-top: 1em;
        }
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
  }).isRequired,

  organization: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    logo_thumbnail: PropTypes.string
  })
}

Header.defaultProps = {
  organization: null
}

export default Header
