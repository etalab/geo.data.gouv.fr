import React, { Component } from 'react'

import CheckItem from './CheckItem'

import Accordion from '../../../../components/Accordion/Accordion'

class CheckProducers extends Component {
  check() {
    const organizations = this.props.organizations

    if (!!organizations && organizations.length > 0) {
      return {
        valid: true,
        msg: 'Au moins un producteur est identifié.',
      }
    }

    return {msg: 'Le producteur n\'a pas été identifié.', valid: false}
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
