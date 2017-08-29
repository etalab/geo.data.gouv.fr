/* eslint-disable react/prop-types */

import React, { Component } from 'react'

import Layout from '../../components/Layout/Layout'
import Organizations from '../../components/Organizations/Organizations'
import Errors from '../../../../components/Errors/Errors'

import { getUser } from '../../../../fetch/fetch'
import { waitForDataAndSetState, cancelAllPromises } from '../../../../helpers/components'

class Admin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      errors: []
    }
  }

  componentWillMount() {
    return waitForDataAndSetState(getUser(), this, 'user')
      .then(() => {
        if (!this.state.user) {
          const redirect = encodeURI(`${process.env.PUBLIC_URL}/publication`)
          const logInUrl = `https://inspire.data.gouv.fr/dgv/login?redirect=${redirect}`

          document.location.replace(logInUrl)
        }
      })
  }

  componentWillUnmount() {
    return cancelAllPromises(this)
  }

  render() {
    const { user, errors } = this.state

    if (errors.length) {
      return <Errors errors={errors} />
    }

    if (!user) {
      return <Errors errors={['Vous devez être authentifié pour accéder à cette page']} /> // TODO: Vous devez être authentifié
    }

    return (
      <Layout user={user} pageTitle={'Vos organisations'} title={'Vos organisations'}>
        <Organizations organizations={user.organizations} />
      </Layout>
    )
  }
}

export default Admin
