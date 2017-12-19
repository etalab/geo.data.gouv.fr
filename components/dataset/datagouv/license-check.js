import React from 'react'
import {translate, Trans} from 'react-i18next'
import PropTypes from 'prop-types'

import licenses from '../../../lib/licenses'

import Check from './check'

class LicenseCheck extends React.Component {
  renderValid() {
    const {license} = this.props
    const found = licenses[license]

    return (
      <div>
        <Trans i18nKey='datagouv.checks.license.validLicense'>
          The <a href={found.link}>{found.name}</a> license is valid.
        </Trans>
      </div>
    )
  }

  renderInvalid() {
    const {license, t} = this.props

    return (
      <div>
        {license ? (
          <Trans i18nKey='datagouv.checks.license.unknownLicense'>
            The <b>{license}</b> license was not recognized.
          </Trans>
        ) : t('datagouv.checks.license.noLicense')}
        <div>
          {t('datagouv.checks.license.licenseList')}
          <ul>
            {Object.entries(licenses).map(([id, l]) => (
              <li key={id}>
                <a href={l.link}>{l.name}</a>
              </li>
            ))}
          </ul>
        </div>
        <style jsx>{`
          ul {
            margin-top: 0.4em;
            margin-bottom: 0;
            padding-left: 1.8em;
          }
        `}</style>
      </div>
    )
  }

  render() {
    const {isValid, t} = this.props

    return (
      <Check title={t('datagouv.checks.license.title')} isValid={isValid}>
        {isValid ? this.renderValid() : this.renderInvalid()}
      </Check>
    )
  }
}

LicenseCheck.propTypes = {
  isValid: PropTypes.bool.isRequired,
  license: PropTypes.string,

  t: PropTypes.func.isRequired
}

LicenseCheck.defaultProps = {
  license: null
}

export default translate('dataset')(LicenseCheck)
