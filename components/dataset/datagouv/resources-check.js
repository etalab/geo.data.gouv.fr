import React from 'react'
import {translate} from 'react-i18next'
import PropTypes from 'prop-types'

import Check from './check'

const ResourcesCheck = ({isValid, t}) => (
  <Check title={t('datagouv.checks.resources.title')} isValid={isValid}>
    {isValid ? t('datagouv.checks.resources.available') : t('datagouv.checks.resources.unavailable')}
  </Check>
)

ResourcesCheck.propTypes = {
  isValid: PropTypes.bool.isRequired,

  t: PropTypes.func.isRequired
}

export default translate('dataset')(ResourcesCheck)
