import React from 'react'
import { translate } from 'react-i18next'
import PropTypes from 'prop-types'

import Check from './Check'

import { ACCEPTED_LICENSES } from 'common/helpers/dataGouvChecks'

export class CheckLicense extends React.PureComponent {
  check() {
    const { license, t } = this.props

    let msg
    let content = (
      <div>
        {t('components.CheckLicense.licensesList')} :
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
      msg = t('components.CheckLicense.noLicenses')
    } else if (ACCEPTED_LICENSES[license]) {
      msg = t('components.CheckLicense.validLicense')
      content = undefined
    } else {
      msg = t('components.CheckLicense.unrecognizedLicense')
    }

    return { msg, content }
  }

  render() {
    const { valid, t } = this.props
    const { msg, content } = this.check()

    return (
      <Check title={t('components.CheckLicense.title')} isValid={valid} msg={msg}>
        {content}
      </Check>
    )
  }
}

CheckLicense.propTypes = {
  valid: PropTypes.bool,
  license: PropTypes.string,
  t: PropTypes.func.isRequired
}

CheckLicense.defaultProps = {
  valid: false
}

export default translate('Dataset')(CheckLicense)
