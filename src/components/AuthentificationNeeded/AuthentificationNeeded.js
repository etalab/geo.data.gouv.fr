import React from 'react'

import Button from '../Buttons/Button'

const AuthentificationNeeded = ({user, children}) => {
  const currentUrl = process.env.PUBLIC_URL + window.location.pathname
  const logInUrl = `https://inspire.data.gouv.fr/dgv/login?redirect=${encodeURIComponent(currentUrl)}`

  if (user) return <div style={{width:'100%'}}>{children}</div>

  return (
    <div>
      <a href={logInUrl}><Button text={'Se connecter'}/></a>
      <a href="https://id.data.gouv.fr/register/"><Button text={'Créer un compte'}/></a>
    </div>
    )
}

export default AuthentificationNeeded
