import React, { Component } from 'react'

class Login extends Component {
  render() {
    const { style } = this.props
    const redirect = encodeURI(`${process.env.PUBLIC_URL}/admin`)
    const logInUrl = `https://inspire.data.gouv.fr/dgv/login?redirect=${redirect}`

    return <a style={style} href={logInUrl}>Publier des données</a>
  }
}

export default Login
