import React from 'react'
import PropTypes from 'prop-types'
import hoist from 'hoist-non-react-statics'

export default () => Component => hoist(class extends React.Component {
  static contextTypes = {
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

  render() {
    const { auth } = this.context

    return (
      <Component session={auth} {...this.props} />
    )
  }
}, Component)
