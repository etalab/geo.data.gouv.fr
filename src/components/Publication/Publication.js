import React, { Component } from 'react'
import Publishing from './Publishing'
import { getUser } from '../../fetch/fetch'
import { waitForDataAndSetState, cancelAllPromises } from '../../helpers/components'
import { theme } from '../../tools'

const styles = {
  admin: {
    padding: '60px 40px',
    display: 'block',
  },
  title: {
    marginBottom: '2em',
    padding: '2em',
    color: '#fff',
    backgroundColor: theme.blue,
  }
}

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

    return (
      <div style={styles.admin}>
        {user ? <Publishing user={user}/> : null}
      </div>
    )

  }
}

export default Admin
