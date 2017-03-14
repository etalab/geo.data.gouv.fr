import React, { Component } from 'react'
import { Link } from 'react-router'

import { getUser, dgvIsUp } from '../../fetch/fetch'

import Banner from '../Banner/Banner'

import { waitForDataAndSetState, cancelAllPromises } from '../../helpers/components'
import { header, nav, home, log, account, logout, authentification, avatar } from './Header.css'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dgvUp: true,
      errors: [],
    }
  }

  componentWillMount() {
    return Promise.all([
      this.updateUser(),
      this.updateDgv(),
    ])
  }

  updateUser() {
    return waitForDataAndSetState(getUser(), this, 'user')
  }

  updateDgv() {
    return waitForDataAndSetState(dgvIsUp(), this, 'dgvUp')
  }

  componentWillUnmount() {
    return cancelAllPromises(this)
  }

  closeWarning() {
    this.setState({ dgvUp: true })
  }

  render() {
    const { user, dgvUp } = this.state
    const loginRedirect = `${process.env.PUBLIC_URL}/publication`
    const logoutRedirect = `${process.env.PUBLIC_URL}`
    const logInUrl =`https://inspire.data.gouv.fr/dgv/login?redirect=${encodeURIComponent(loginRedirect)}`
    const logoutUrl =`https://inspire.data.gouv.fr/dgv/logout?redirect=${encodeURIComponent(logoutRedirect)}`
    const login = <a className={log} href={logInUrl}>Publier des données</a>

    return (
      <div className={header}>
        <nav className={nav} role='navigation'>
          <a className={home} href='/'>inspire.data.gouv.fr</a>
          {!user ? login : (
            <div className={authentification}>
              <Link to={'/publication'}>
                <div className={account}>
                  <img alt='avatar' className={avatar} src={user.avatar} />
                  {`${user.first_name} ${user.last_name}`}
                </div>
              </Link>
              <a className={log} href={logoutUrl}><span className={logout}>Déconnexion</span><i className='power icon'></i></a>
            </div>
          )}
        </nav>
        {!dgvUp ?
          <Banner
            msg={'beta.gouv.fr rencontre actuellement des problèmes'}
            close={() => this.closeWarning()}
            status={'warning'} /> : null
          }
      </div>
    )
  }
}

export default Header
