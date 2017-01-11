import React, { Component } from 'react'

import CheckItem from './CheckItem'

import Accordion from '../../../../components/Accordion/Accordion'

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
    const check = this.check()

    return <Accordion
              title={<CheckItem name={'Disponibilité de la donnée'} valid={check.valid} />}
              content={check.content}
              msg={check.msg} />
    }
}

export default DatasetDataAvailability
