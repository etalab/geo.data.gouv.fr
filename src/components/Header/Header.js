import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { translate } from 'react-i18next'

import { getUser } from '../../fetch/fetch'
import { waitForDataAndSetState, cancelAllPromises } from '../../helpers/components'

import styles from './Header.scss'

const { PUBLIC_URL } = process.env

class Header extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired
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
    const { t } = this.props
    const { user } = this.state
    const loginRedirect = `${PUBLIC_URL}/publication`
    const isPublication = window.location.pathname.startsWith('/publication')
    const logoutRedirect = isPublication ? PUBLIC_URL : PUBLIC_URL + window.location.pathname
    const logInUrl = `https://inspire.data.gouv.fr/dgv/login?redirect=${encodeURIComponent(loginRedirect)}`
    const logoutUrl = `https://inspire.data.gouv.fr/dgv/logout?redirect=${encodeURIComponent(logoutRedirect)}`
    const login = <a className={styles.log} href={logInUrl}>{t('components.Header.login')}</a>

    return (
      <nav className={styles.nav}>
        <Link to='/' className={styles.home}>inspire.data.gouv.fr</Link>

        {!user ? login : (
          <div className={styles.authentification}>
            <Link to={'/publication'}>
              <div className={styles.account}>
                <img alt='avatar' className={styles.avatar} src={user.avatar} />
                {`${user.first_name} ${user.last_name}`}
              </div>
            </Link>
            <a className={styles.log} href={logoutUrl}><span className={styles.logout}>{t('components.Header.logout')}</span><i className='power icon' /></a>
          </div>
        )}
      </nav>
    )
  }
}

export default translate('Common')(Header)
