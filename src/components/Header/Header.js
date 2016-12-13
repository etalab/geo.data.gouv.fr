import React from 'react'
import Login from '../Authentification/Login'
import { theme } from '../../tools'

const styles = {
  nav: {
    backgroundColor: theme.blue,
    padding: '20px 2em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  home: {
    color: theme.white,
    fontSize: '2em',
  },
  button: {
    padding: '5px 10px',
    backgroundColor: theme.deepblue,
    color: '#fff',
    borderRadius: '7px',
    boxShadow: theme.boxShadowZ1,
  },
}

const Header = () => {
  return (
    <nav style={styles.nav} role="navigation">
      <a style={styles.home} href='/'>Inspire</a>
      <Login style={styles.button} href='/publication' />
    </nav>
  )
}

export default Header
