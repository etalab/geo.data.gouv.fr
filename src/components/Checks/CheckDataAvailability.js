import React, { Component } from 'react'
import Accordion from '../Accordion/Accordion'
import CheckItem from './CheckItem'

class CheckLicense extends Component {
  check() {
    const distributions = this.props.distributions
    let valid = false
    let msg = 'Aucune distribution n\'a été trouvée.'
    let content

    if (!!distributions && distributions.some((distribution) => distribution.available)) {
      valid = true
      msg = 'Au moins une des distribution est disponible.'
      content = distributions.map((distribution, idx) => <CheckItem key={idx} name={distribution.typeName || distribution.layer} valid={distribution.available} />)
    }

    return {msg, content, valid}
  }

  render() {
    const check = this.check()

    return <Accordion
              title={<CheckItem name={'Disponibilité de la donnée'} valid={check.valid} />}
              content={check.content}
              msg={check.msg} />
    }
}

export default CheckLicense
