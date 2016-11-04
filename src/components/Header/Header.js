import React from 'react'
import { theme } from '../../tools'

const styles = {
  nav: {
    backgroundColor: theme.blue,
    padding: '20px 2em',
    display: 'flex',
    alignItems: 'center',
  },

  home: {
    color: theme.white,
    fontSize: '2em',
  }
}

const Header = () => {
  return (
    <nav style={styles.nav} role="navigation">
      <a style={styles.home} href='/'>Inspire</a>
    </nav>
  )
}

export default Header
