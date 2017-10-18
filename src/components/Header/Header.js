import React from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { translate } from 'react-i18next'

import { getUser } from '../../fetch/fetch'
import { waitForDataAndSetState, cancelAllPromises } from '../../helpers/components'
import LanguageSelection from '../LanguageSelection/LanguageSelection'

import styles from './Header.scss'
import logo from './images/logo-geo.svg'

const { PUBLIC_URL, PUBLICATION_BASE_URL } = process.env

class Header extends React.Component {
  static propTypes = {
    i18n: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }).isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      errors: []
    }
  }

  componentWillMount() {
    return waitForDataAndSetState(getUser(), this, 'user')
  }

  componentWillUnmount() {
    return cancelAllPromises(this)
  }

  render() {
    const { i18n, t, location } = this.props
    const { user } = this.state

    const loginRedirect = `${PUBLIC_URL}/publication`
    const isPublication = location.pathname.startsWith('/publication')
    const logoutRedirect = isPublication ? PUBLIC_URL : PUBLIC_URL + location.pathname

    const logInUrl = `${PUBLICATION_BASE_URL}/login?redirect=${encodeURIComponent(loginRedirect)}`
    const logoutUrl = `${PUBLICATION_BASE_URL}/logout?redirect=${encodeURIComponent(logoutRedirect)}`
    const login = <a href={logInUrl}>{t('components.Header.login')}</a>

    return (
      <nav>
        <div className={styles.container}>
          <Link to={'/'}>
            <img className={styles.logo} src={logo} alt='Accueil de geo.data.gouv.fr' />
          </Link>

          <ul className={styles.links}>
            <li>
              {!user ? login : (
                <Link to={'/publication'}>
                  <img alt='avatar' className={styles.avatar} src={user.avatar} />
                  {`${user.first_name} ${user.last_name}`}
                </Link>
              )}
            </li>
            <li>
              <LanguageSelection language={i18n.language} />
            </li>
            {user && (
              <li>
                <a href={logoutUrl}><span>{t('components.Header.logout')}</span><i className='power icon' /></a>
              </li>)}
          </ul>
        </div>
      </nav>
    )
  }
}

export default withRouter(translate('Common')(Header))
