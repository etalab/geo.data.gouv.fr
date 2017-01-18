import React, { Component } from 'react'

import Check from './Check'

class CheckProducers extends Component {
  check() {
    const { organizations } = this.props

    if (!!organizations && organizations.length > 0) {
      return {
        valid: true,
        msg: 'Au moins un producteur est identifié.',
        content: organizations
      }
    }

    return { msg: 'Le producteur n\'a pas été identifié.', valid: false }
  }

  render() {
    const { valid, msg, content } = this.check()

    return (
      <Check title='Producteur' isValid={valid} msg={msg}>
        {content ? content : null }
      </Check>
      )
  }
}

export default CheckProducers
