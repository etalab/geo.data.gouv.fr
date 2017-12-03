import React from 'react'
import PropTypes from 'prop-types'
import hoist from 'hoist-non-react-statics'

import { getSession, clearSession } from '../../lib/user'

export default () => Component => hoist(class extends React.PureComponent {
  static childContextTypes = {
    session: PropTypes.shape({
      auth: PropTypes.bool,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        first_name: PropTypes.string.isRequired,
        last_name: PropTypes.string.isRequired,
        avatar_thumbnail: PropTypes.string.isRequired
      }),
      clear: PropTypes.func.isRequired
    })
  }

  state = {}

  getChildContext() {
    const { session } = this.state

    return {
      session: session ? {
        auth: session.auth,
        user: session.user,
        clear: clearSession
      } : null
    }
  }

  async componentDidMount() {
    const session = await getSession()

    this.setState(state => ({
      session
    }))
  }

  render() {
    const { session } = this.getChildContext()

    return (
      <Component session={session} {...this.props} />
    )
  }
}, Component)
