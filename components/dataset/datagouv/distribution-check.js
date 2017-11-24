import React from 'react'
import { translate } from 'react-i18next'
import PropTypes from 'prop-types'

import Check from './check'

const DistributionCheck = ({ distributions, isValid, t }) => (
  <Check title={t('datagouv.checks.distribution.title')} isValid={isValid}>
    {isValid ? (
      <div>
        {t('datagouv.checks.distribution.available')}
        {distributions.map(distribution => distribution.available ? (
          <div key={distribution._id}>
            <b>{distribution.typeName || distribution.layer || distribution.name}</b>
          </div>
        ) : null)}
      </div>
    ) : t('datagouv.checks.distribution.unavailable')}
  </Check>
)

DistributionCheck.propTypes = {
  isValid: PropTypes.bool.isRequired,
  distributions: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    available: PropTypes.bool,
    typeName: PropTypes.string,
    layer: PropTypes.string,
    name: PropTypes.string
  })).isRequired,

  t: PropTypes.func.isRequired
}

export default translate('dataset')(DistributionCheck)
