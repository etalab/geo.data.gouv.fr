import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'next/router'
import { translate } from 'react-i18next'

import Container from '../../container'
import Link from '../../link'
import LanguageSelection from './language-selection'

import { PUBLIC_URL, PUBLICATION_BASE_URL } from '@env'

const Header = ({ router, t }) => {
  const loginRedirect = `${PUBLIC_URL}/publication`
  const isPublication = router.pathname.startsWith('/publication')
  const logoutRedirect = isPublication ? PUBLIC_URL : PUBLIC_URL + router.pathname

  const logInUrl = `${PUBLICATION_BASE_URL}/login?redirect=${encodeURIComponent(loginRedirect)}`
  const logoutUrl = `${PUBLICATION_BASE_URL}/logout?redirect=${encodeURIComponent(logoutRedirect)}`

  const user = null

  return (
    <nav>
      <Container fluid>
        <div>
          <Link href='/'>
            <a className='logo'>
              <img src='/static/images/logo.svg' alt='Logo de la République française (1999)' />
            </a>
          </Link>

          <ul>
            <li>
              {!user ? (
                <a href={logInUrl}>{t('components.Header.login')}</a>
              ) : (
                <Link href='/publication'>
                  <a>
                    <img alt='avatar' className='avatar' src={user.avatar} />
                    {user.first_name} {user.last_name}
                  </a>
                </Link>
              )}
            </li>
            <li>
              <LanguageSelection />
            </li>
            {user && (
              <li>
                <a href={logoutUrl}><span>{t('components.Header.logout')}</span><i className='power icon' /></a>
              </li>
            )}
          </ul>
        </div>
      </Container>

      <style jsx>{`
        @import 'colors';

        nav {
          background: $white;
        }

        div {
          display: flex;
          align-items: center;
          justify-content: space-between;

          @media (max-width: 551px) {
            flex-direction: column;
            align-items: flex-start;
          }
        }

        a {
          color: $black;
        }

        .logo {
          img {
            height: 68px;
            padding: 1em 0;
          }
        }

        ul {
          display: inline;
          margin: 0;
          padding: 0;
          list-style-type: 0;
          text-align: right;

          li {
            padding: 0;
            display: inline;

            + li {
              padding-left: 15px;
            }
          }

          a {
            color: $black;
          }
        }

        .avatar {
          width: 30px;
          margin: -0.7em 0.3em;
          border-radius: 60px;
        }
      `}</style>
    </nav>
  )
}

Header.propTypes = {
  router: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,

  t: PropTypes.func.isRequired
}

export default translate()(withRouter(Header))
