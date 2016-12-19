import React from 'react'
import { nav, home, login } from './Header.css'

const Header = () => {
  const redirect = encodeURI(`${process.env.PUBLIC_URL}/publication`)
  const logInUrl = `https://inspire.data.gouv.fr/dgv/login?redirect=${redirect}`

  return (
    <nav className={nav} role="navigation">
      <a className={home} href='/'>Inspire</a>
      <a className={login} href={logInUrl}>Publier des données</a>
    </nav>
  )
}

export default Header
