import React from 'react'
import { translate } from 'react-i18next'
import PropTypes from 'prop-types'

import Check from './Check'

export const CheckProducers = ({ valid, organizations, t }) => {
  const msg = valid
    ? t('components.CheckProducers.identifiedProducer')
    : t('components.CheckProducers.unindentifiedProducer')

  return (
    <Check title={t('components.CheckProducers.title')} isValid={valid} msg={msg}>
      {organizations || null }
    </Check>
  )
}

CheckProducers.propTypes = {
  valid: PropTypes.bool,
  organizations: PropTypes.arrayOf(PropTypes.string)
}

CheckProducers.defaultProps = {
  valid: false
}

CheckProducers.propTypes = {
  valid: PropTypes.bool.isRequired,
  organizations: PropTypes.array.isRequired,

  t: PropTypes.func.isRequired
}

export default translate('Dataset')(CheckProducers)
