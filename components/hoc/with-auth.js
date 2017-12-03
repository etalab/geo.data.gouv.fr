import React from 'react'
import PropTypes from 'prop-types'

import { getUser, clearUser } from '../../lib/user'

export default () => Component => class extends React.PureComponent {
  static childContextTypes = {
    auth: PropTypes.shape({
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        first_name: PropTypes.string.isRequired,
        last_name: PropTypes.string.isRequired,
        avatar_thumbnail: PropTypes.string.isRequired
      }),
      logout: PropTypes.func.isRequired
    }).isRequired
  }

  state = {}

  getChildContext() {
    const { user } = this.state

    return {
      auth: {
        user: user,
        logout: clearUser
      }
    }
  }

  async componentDidMount() {
    const user = await getUser()

    this.setState(state => ({
      user
    }))
  }

  render() {
    return (
      <Component {...this.props} />
    )
  }
}
