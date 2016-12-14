import React from 'react'
import { nav } from './Header.css'

const Header = () => {
  return (
    <nav className={nav} role="navigation">
      <a href='/'>Inspire</a>
    </nav>
  )
}

export default Header
