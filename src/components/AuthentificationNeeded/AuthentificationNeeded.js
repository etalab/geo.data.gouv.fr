import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import { Button } from '../Buttons'

const { PUBLIC_URL } = process.env

const AuthentificationNeeded = ({ user, children, location }) => {
  const currentUrl = PUBLIC_URL + location.pathname
  const logInUrl = `https://inspire.data.gouv.fr/dgv/login?redirect=${encodeURIComponent(currentUrl)}`

  if (user) {
    return (
      <div style={{ width:'100%' }}>{children}</div>
    )
  }

  return (
    <div>
      <a href={logInUrl}><Button text={'Se connecter'} /></a>
      <a href='https://id.data.gouv.fr/register/'><Button text={'Créer un compte'} /></a>
    </div>
  )
}

AuthentificationNeeded.propTypes = {
  user: PropTypes.object,
  children: PropTypes.node,

  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
}

export default withRouter(AuthentificationNeeded)
