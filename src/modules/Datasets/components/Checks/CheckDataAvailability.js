import React, { Component } from 'react'

import Check from './Check'
import CheckItem from './CheckItem'

class DatasetDataAvailability extends Component {
  check() {
    const distributions = this.props.distributions

    if (!!distributions && distributions.some((distribution) => distribution.available)) {
      return {
        valid: true,
        msg: 'Au moins une des distribution est disponible.',
        content: distributions.map((distribution, idx) => {
          const name = distribution.typeName || distribution.layer || distribution.name
          return <CheckItem key={idx} name={name} valid={distribution.available} />
        }),
      }
    }

    return {msg: 'Aucune distribution n\'a été trouvée.', valid: false}
  }

  render() {
    const { valid, msg, content } = this.check()

    return (
      <Check title='Disponibilité de la donnée' isValid={valid} msg={msg}>
        {content ? content : null }
      </Check>
      )
    }
}

export default DatasetDataAvailability
