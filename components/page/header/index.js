import React from 'react'
import PropTypes from 'prop-types'
import { flowRight } from 'lodash'
import { withRouter } from 'next/router'
import { translate } from 'react-i18next'

import withSession from '../../hoc/with-session'

import Container from '../../container'
import Link from '../../link'
import LanguageSelection from './language-selection'

import { PUBLIC_URL, PUBLICATION_BASE_URL } from '@env'

class Header extends React.Component {
  static propTypes = {
    router: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }).isRequired,

    session: PropTypes.shape({
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        first_name: PropTypes.string.isRequired,
        last_name: PropTypes.string.isRequired,
        avatar_thumbnail: PropTypes.string.isRequired
      }),
      logout: PropTypes.func.isRequired
    }),

    i18n: PropTypes.shape({
      language: PropTypes.string.isRequired
    }).isRequired,
    t: PropTypes.func.isRequired
  }

  onLogout = e => {
    const { session: { logout } } = this.props

    logout()
  }

  render() {
    const { router, session: { user }, t, i18n: { language } } = this.props

    const publicUrl = `${PUBLIC_URL}/${language}`

    const loginRedirect = `${publicUrl}/publication`
    const isPublication = router.pathname.startsWith('/publication')
    const logoutRedirect = isPublication ? publicUrl : publicUrl + router.pathname

    const logInUrl = `${PUBLICATION_BASE_URL}/login?redirect=${encodeURIComponent(loginRedirect)}`
    const logoutUrl = `${PUBLICATION_BASE_URL}/logout?redirect=${encodeURIComponent(logoutRedirect)}`

    return (
      <nav>
        <Container fluid>
          <div>
            <Link href='/' prefetch>
              <a className='logo'>
                <img src='/static/images/logo.svg' alt='Logo de la République française (1999)' />
              </a>
            </Link>

            <ul>
              <li>
                {!user ? (
                  <a href={logInUrl}>{t('header.publish')}</a>
                ) : (
                  <Link href='/publication'>
                    <a>
                      <img alt='' className='avatar' src={user.avatar_thumbnail} />
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
                  <a href={logoutUrl} onClick={this.onLogout}>
                    <span>{t('header.logout')}</span>
                  </a>
                </li>
              )}
            </ul>
          </div>
        </Container>

        <style jsx>{`
          @import 'colors';

          nav {
            background: $white;
            border-bottom: 1px solid $lightgrey;
          }

          div {
            display: flex;
            align-items: center;
            justify-content: space-between;

            @media (max-width: 551px) {
              flex-direction: column;
              align-items: flex-start;
              padding-bottom: 1em;
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
            display: inline-block;
            vertical-align: -10px;
            width: 30px;
            margin-right: 5px;
            border-radius: 60px;
          }
        `}</style>
      </nav>
    )
  }
}

export default flowRight(
  translate(),
  withRouter,
  withSession()
)(Header)
