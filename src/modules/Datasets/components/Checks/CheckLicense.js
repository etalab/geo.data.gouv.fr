import React, { Component } from 'react'

import Check from './Check'

import { ACCEPTED_LICENSES } from '../../../../helpers/dataGouvChecks'

class CheckLicense extends Component {
  check() {
    const { license } = this.props
    let msg = ''
    let content = (
      <div>
        Les licenses reconnue sont :
        <ul>
          { Object.keys(ACCEPTED_LICENSES).map((licence, idx) => {
            const li = ACCEPTED_LICENSES[licence]
            return <li key={idx}><a href={li.link}>{li.name}</a></li>
          }) }
        </ul>
      </div>
    )

    if (!license) {
      msg = 'Aucune licence n\'a pu être trouvée.'
    } else if (ACCEPTED_LICENSES[license]) {
      msg = `La licence ${ACCEPTED_LICENSES[license].name} est valide.`
      content = undefined
    } else {
      msg = `La licence ${license} n'est pas reconnue.`
    }

    return {msg, content}
  }

  render() {
    const { valid } = this.props
    const { msg, content } = this.check()

    return (
      <Check title='Licence' isValid={valid} msg={msg}>
        {content}
      </Check>
      )
    }
}

export default CheckLicense
