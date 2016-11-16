import React, { Component } from 'react'
import Accordion from '../Accordion/Accordion'
import CheckItem from './CheckItem'

class CheckProducers extends Component {
  check() {
    const organizations = this.props.organizations
    let valid = false
    let msg = 'Le producteur n\'a pas été identifié.'

    if (!!organizations && organizations.length > 0) {
      valid = true
      msg = 'Au moins un producteur est identifié.'
    }

    return {msg, valid}
  }

  render() {
    const check = this.check()

    return <Accordion
              title={<CheckItem name={'Producteur'} valid={check.valid} />}
              content={this.props.organizations}
              msg={check.msg} />
    }
}

export default CheckProducers
