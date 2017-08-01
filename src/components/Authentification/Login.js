import React from 'react'
import PropTypes from 'prop-types'

const Login = ({ style }) => {
  const redirect = encodeURI(`${process.env.PUBLIC_URL}/publication`)
  const logInUrl = `https://inspire.data.gouv.fr/dgv/login?redirect=${redirect}`

  return (
    <a style={style} href={logInUrl}>Publier des données</a>
  )
}

Login.propTypes = {
  style: PropTypes.object
}

export default Login
