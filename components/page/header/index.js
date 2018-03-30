import React from 'react'
import PropTypes from 'prop-types'
import getConfig from 'next/config'
import {flowRight} from 'lodash'
import {withRouter} from 'next/router'
import {translate} from 'react-i18next'

import withSession from '../../hoc/with-session'

import Container from '../../container'
import Link from '../../link'
import LanguageSelection from './language-selection'

const {publicRuntimeConfig: {
  PUBLIC_URL,
  PUBLICATION_BASE_URL
}} = getConfig()

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
      clear: PropTypes.func.isRequired
    }),

    i18n: PropTypes.shape({
      language: PropTypes.string.isRequired
    }).isRequired,
    t: PropTypes.func.isRequired
  }

  static defaultProps = {
    session: null
  }

  render() {
    const {router, session, t, i18n: {language}} = this.props

    const publicUrl = `${PUBLIC_URL}/${language}`

    const loginRedirect = `${publicUrl}/publication`
    const isPublication = router.pathname.startsWith('/publication')
    const logoutRedirect = isPublication ? `${PUBLIC_URL}/${language}` : PUBLIC_URL + router.asPath

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
                {session && session.user ? (
                  <Link href='/publication' prefetch>
                    <a>
                      <img alt='' className='avatar' src={session.user.avatar_thumbnail || '/static/images/avatar.png'} />
                      {session.user.first_name} {session.user.last_name}
                    </a>
                  </Link>
                ) : (
                  <a href={logInUrl}>
                    {t('header.publish')}
                  </a>
                )}
              </li>
              <li>
                <LanguageSelection />
              </li>
              {session && session.user && (
                <li>
                  <a href={logoutUrl} onClick={session.clear}>
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

          .logo {
            img {
              height: 68px;
              padding: 1em 0;
            }
          }

          ul {
            display: inline-block;
            margin: 0;
            padding: 0;
            list-style-type: none;
            text-align: right;

            @media (max-width: 551px) {
              text-align: left;
            }

            li {
              padding: 0;
              display: inline-block;

              + li {
                margin-left: 5px;
              }

              @media (max-width: 551px) {
                margin-right: 15px;
                margin-bottom: 2px;

                + li {
                  margin-left: 0;
                }
              }
            }

            a {
              color: $black;

              @media (min-width: 552px) {
                padding: 0.4em 0.8em;
                border-radius: 3px;

                &:hover {
                  background: $hoverblue;
                  transition: background ease-out 0.5s;
                }
              }
            }
          }

          .avatar {
            display: inline-block;
            vertical-align: -4px;
            height: 20px;
            margin-right: 8px;
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
  withSession
)(Header)
