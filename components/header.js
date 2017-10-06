import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { withRouter } from 'next/router'

// import { translate } from '../lib/i18n/hoc'
import { translate } from 'react-i18next'
// import logo from './images/logo-geo.svg'

const PUBLIC_URL = process.env.PUBLIC_URL

const Header = ({ router, t, i18n }) => {
  const loginRedirect = `${PUBLIC_URL}/publication`
  const isPublication = router.pathname.startsWith('/publication')
  const logoutRedirect = isPublication ? PUBLIC_URL : PUBLIC_URL + router.pathname

  const logInUrl = `https://inspire.data.gouv.fr/dgv/login?redirect=${encodeURIComponent(loginRedirect)}`
  const logoutUrl = `https://inspire.data.gouv.fr/dgv/logout?redirect=${encodeURIComponent(logoutRedirect)}`

  const user = {
    first_name: 'John',
    last_name: 'Doe'
  }

  return (
    <nav>
      <Link href='/'>
        <a className='logo'>
          <img src='/static/images/logo.svg' alt='Logo de la République française (1999)' />
        </a>
      </Link>

      {!user ? (
        <div className='login'>
          <a href={logInUrl}>{t('components.Header.login')}</a>
        </div>
      ) : (
        <div className='account'>
          <Link href='/publication'>
            <a>
              <img alt='avatar' src={user.avatar} />
              {`${user.first_name} ${user.last_name}`}
            </a>
          </Link>

          <a href={logoutUrl} className='logout'>
            <span>{t('components.Header.logout')}</span><i className='power icon' />
          </a>
        </div>
      )}

      <style jsx>{`
        nav {
          padding: 2em;
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: $darkgrey;
          z-index: 1;
        }

        a {
          color: $darkgrey;
        }

        a:focus,
        a:hover {
          color: #000;
        }

        .logo {
          display: flex;
          align-items: center;
        }

        .logo img {
          width: 260px;
        }

        .login a {
          border-radius: 5px;
          padding: 10px 15px;
          background-color: $blue;
          font-size: 1em;
        }

        .account {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .account img {
          width: 30px;
          margin-right: 0.3em;
          border-radius: 60px;
        }

        .account a {
          text-decoration: underline;
        }

        .logout {
          margin-left: 1em;
        }

        @media (max-width: 551px) {
          .logo img {
            width: 160px;
          }

          .login a {
            padding: 0 5px;
          }

          .account {
            margin-right: 0.4em;
          }

          .logout {
            display: none;
          }
        }
      `}</style>
    </nav>
  )
}

export default translate()(withRouter(Header))
