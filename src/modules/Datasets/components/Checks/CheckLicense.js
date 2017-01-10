import React, { Component } from 'react'

import CheckItem from './CheckItem'

import Accordion from '../../../../components/Accordion/Accordion'

export const ACCEPTED_LICENSES = [
  'fr-lo',
  'odbl',
]

class CheckLicense extends Component {
  check() {
    const license = this.props.license
    let valid = false
    let msg = ''
    let content = <div>
      <div>Les licenses reconnue sont: </div>
        {ACCEPTED_LICENSES}
    </div>

    if (!license) {
      msg = 'Aucune licence n\'a pu être trouvée.'
    } else if (ACCEPTED_LICENSES.includes(license)) {
      valid = true
      msg = `La licence ${license} est valide.`
      content = undefined
    } else {
      msg = `La licence ${license} n'est pas reconnue.`
    }

    return {msg, content, valid}
  }

  render() {
    const check = this.check()

    return <Accordion
              title={<CheckItem name={'Licence'} content={check.content} valid={check.valid} />}
              msg={check.msg} />
    }
}

export default CheckLicense
