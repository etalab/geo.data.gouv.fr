import React, { Component } from 'react'

import Check from './Check'

export const ACCEPTED_LICENSES = [
  'fr-lo',
  'odbl',
]

class CheckLicense extends Component {
  check() {
    const { license } = this.props
    let valid = false
    let msg = ''
    let content = (
      <div>
        Les licenses reconnue sont :
        <ul>
          { ACCEPTED_LICENSES.map( (licence, idx) => <li key={idx}>{licence}</li>) }
        </ul>
      </div>
    )

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
    const { valid, msg, content } = this.check()

    return (
      <Check title='Licence' isValid={valid} msg={msg}>
        {content}
      </Check>
      )
    }
}

export default CheckLicense
