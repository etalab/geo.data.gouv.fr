import React, { Component } from 'react'
import Accordion from '../Accordion/Accordion'
import CheckItem from './CheckItem'

export const ACCEPTED_LICENSES = [
  'fr-lo',
  'odbl',
]

class CheckLicense extends Component {
  check() {
    const license = this.props.license
    let valid = false
    let msg = ''

    if (!license) {
      msg = 'Aucune licence n\'a pu être trouvée.'
    } else if (ACCEPTED_LICENSES.includes(license)) {
      valid = true
      msg = `La licence ${license} est valide.`
    } else {
      msg = `La licence ${license} n'est pas reconnue.`
    }

    return {msg, valid}
  }

  render() {
    const check = this.check()

    return <Accordion
              title={<CheckItem name={'Licence'} valid={check.valid} />}
              msg={check.msg} />
    }
}

export default CheckLicense
