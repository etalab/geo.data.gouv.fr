import React, { Component } from 'react'
import { IndexLink, Link } from 'react-router'

import { getUser } from '../../fetch/fetch'
import { waitForDataAndSetState, cancelAllPromises } from '../../helpers/components'

import styles from './Header.scss'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: [],
    }
  }

  componentWillMount() {
    return waitForDataAndSetState(getUser(), this, 'user')
  }

  componentWillUnmount() {
    return cancelAllPromises(this)
  }

  render() {
    const { user } = this.state
    const loginRedirect = `${process.env.PUBLIC_URL}/publication`
    const isPublication = window.location.pathname.startsWith('/publication')
    const logoutRedirect = isPublication ? process.env.PUBLIC_URL : process.env.PUBLIC_URL + window.location.pathname
    const logInUrl =`https://inspire.data.gouv.fr/dgv/login?redirect=${encodeURIComponent(loginRedirect)}`
    const logoutUrl =`https://inspire.data.gouv.fr/dgv/logout?redirect=${encodeURIComponent(logoutRedirect)}`
    const login = <a className={styles.log} href={logInUrl}>Publier des données</a>

    return (
      <nav className={styles.nav}>
        <IndexLink to='/' className={styles.home}>inspire.data.gouv.fr</IndexLink>

        {!user ? login : (
          <div className={styles.authentification}>
            <Link to={'/publication'}>
              <div className={styles.account}>
                <img alt='avatar' className={styles.avatar} src={user.avatar} />
                {`${user.first_name} ${user.last_name}`}
              </div>
            </Link>
            <a className={styles.log} href={logoutUrl}><span className={styles.logout}>Déconnexion</span><i className='power icon'></i></a>
          </div>
        )}
      </nav>
    )
  }
}

export default Header
