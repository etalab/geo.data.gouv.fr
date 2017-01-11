import React, { Component } from 'react'
import { Link } from 'react-router'
import { getUser } from '../../fetch/fetch'
import { waitForDataAndSetState, cancelAllPromises } from '../../helpers/components'
import { nav, home, log, account, authentification, avatar } from './Header.css'

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
    const logoutRedirect = `${process.env.PUBLIC_URL}`
    const logInUrl =`https://inspire.data.gouv.fr/dgv/login?redirect=${encodeURIComponent(loginRedirect)}`
    const logoutUrl =`https://inspire.data.gouv.fr/dgv/logout?redirect=${encodeURIComponent(logoutRedirect)}`
    const login = <a className={log} href={logInUrl}>Publier des données</a>

    return (
      <nav className={nav} role="navigation">
        <a className={home} href='/'>Inspire</a>
        {!user ? login : (
          <div className={authentification}>
            <Link to={'/publication'}>
              <div className={account}>
                <img alt="avatar" className={avatar} src={user.avatar} />
                {`${user.first_name} ${user.last_name}`}
              </div>
            </Link>
            <a className={log} href={logoutUrl}>Déconnexion<i className="power icon"></i></a>
          </div>
        )}
      </nav>
    )
  }
}

export default Header
