import React from 'react'
import { translate } from 'react-i18next'
import PropTypes from 'prop-types'

import Check from './Check'
import CheckItem from './CheckItem'

export const CheckDataAvailability = ({ valid, distributions, t }) => {
  const msg = valid
    ? t('components.CheckDataAvailability.distributionAvailable')
    : t('components.CheckDataAvailability.distributionUnavailable')

  return (
    <Check title={t('components.CheckDataAvailability.title')} isValid={valid} msg={msg}>
      {valid && distributions.map(distribution => (
        <CheckItem
          key={distribution._id}
          name={distribution.typeName || distribution.layer || distribution.name}
          valid={distribution.available}
        />
      ))}
    </Check>
  )
}

CheckDataAvailability.propTypes = {
  valid: PropTypes.bool,
  distributions: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    available: PropTypes.bool,
    typeName: PropTypes.string,
    layer: PropTypes.string,
    name: PropTypes.string
  })).isRequired,

  t: PropTypes.func.isRequired
}

CheckDataAvailability.defaultProps = {
  valid: false
}

export default translate('Dataset')(CheckDataAvailability)
