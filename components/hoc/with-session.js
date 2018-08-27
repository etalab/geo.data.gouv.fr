import React from 'react'
import hoist from 'hoist-non-react-statics'

import SessionContext from '../../contexts/session-context'

export default Component => hoist(class extends React.Component {
  render() {
    return (
      <SessionContext.Consumer>
        {session => (
          <Component session={session} {...this.props} />
        )}
      </SessionContext.Consumer>
    )
  }
}, Component)
