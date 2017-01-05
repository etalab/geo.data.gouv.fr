import React, { Component } from 'react'
import Publishing from './Publishing'
import PublishingSection from './PublishingSection'
import Organizations from '../Organization/Organizations'
import { getUser } from '../../fetch/fetch'
import { waitForDataAndSetState, cancelAllPromises } from '../../helpers/components'

class Admin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      errors: [],
    }
  }

  componentDidMount() {
    document.title = 'Vos organisations'
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
    const section = <PublishingSection title={'Vos organisations'} component={component} toWait={user} />

    return <Publishing user={user} section={section} />
  }
}

export default Admin
