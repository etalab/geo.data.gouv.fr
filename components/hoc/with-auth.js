import React from 'react'
import PropTypes from 'prop-types'
import hoist from 'hoist-non-react-statics'

import { getSession, clearSession } from '../../lib/user'

export default () => Component => hoist(class extends React.PureComponent {
  static childContextTypes = {
    auth: PropTypes.shape({
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        first_name: PropTypes.string.isRequired,
        last_name: PropTypes.string.isRequired,
        avatar_thumbnail: PropTypes.string.isRequired
      }),
      clear: PropTypes.func.isRequired
    }).isRequired
  }

  state = {}

  getChildContext() {
    const { user } = this.state

    return {
      auth: {
        user: user,
        clear: clearSession
      }
    }
  }

  async componentDidMount() {
    const { user } = await getSession()

    this.setState(state => ({
      user
    }))
  }

  render() {
    return (
      <Component {...this.props} />
    )
  }
}, Component)
