import React from 'react'
import { Link } from 'react-router'
import './Header.css'

const Header = () => {
  return (
    <div>
      <div id="header">
        <Link to={`/`}>
          <h1 className="ui huge center aligned inverted header">Dashboard Inspire</h1>
        </Link>
      </div>
    </div>
  )
}

export default Header
