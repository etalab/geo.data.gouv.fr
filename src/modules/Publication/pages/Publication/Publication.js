import React, { Component } from 'react'

import Publishing from '../../components/Publishing/Publishing'
import PublishingSection from '../../components/PublishingSection/PublishingSection'
import Organizations from '../../components/Organizations/Organizations'

import { getUser } from '../../../../fetch/fetch'
import { waitForDataAndSetState, cancelAllPromises } from '../../../../helpers/components'

class Admin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      errors: [],
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
    const { user } = this.state
    const component = user ? <Organizations organizations={user.organizations} /> : null
    const section = <PublishingSection pageTitle={'Vos organisations'} title={'Vos organisations'} component={component} toWait={user} />

    return <Publishing user={user} section={section} />
  }
}

export default Admin
