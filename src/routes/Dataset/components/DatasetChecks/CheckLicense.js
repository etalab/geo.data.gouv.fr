import React from 'react'
import PropTypes from 'prop-types'

import Check from './Check'

import { ACCEPTED_LICENSES } from 'common//helpers/dataGouvChecks'

class CheckLicense extends React.PureComponent {
  check() {
    const { license } = this.props

    let msg
    let content = (
      <div>
        Les licenses reconnue sont :
        <ul>
          {Object.entries(ACCEPTED_LICENSES).map(([key, li]) => (
            <li key={key}>
              <a href={li.link}>{li.name}</a>
            </li>
          ))}
        </ul>
      </div>
    )

    if (!license) {
      msg = 'Aucune licence n’a pu être trouvée.'
    } else if (ACCEPTED_LICENSES[license]) {
      msg = `La licence ${ACCEPTED_LICENSES[license].name} est valide.`
      content = undefined
    } else {
      msg = `La licence ${license} n’est pas reconnue.`
    }

    return { msg, content }
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

CheckLicense.propTypes = {
  valid: PropTypes.bool,
  license: PropTypes.string
}

CheckLicense.defaultProps = {
  valid: false
}

export default CheckLicense
