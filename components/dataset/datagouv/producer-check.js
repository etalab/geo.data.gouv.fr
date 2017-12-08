import React from 'react'
import { translate } from 'react-i18next'
import PropTypes from 'prop-types'

import Check from './check'

const ProducerCheck = ({ organizations, isValid, t }) => (
  <Check title={t('datagouv.checks.producer.title')} isValid={isValid}>
    {isValid ? (
      <div>
        {t('datagouv.checks.producer.foundProducer')}
        <div>
          {organizations.map((org, i) => (
            <span key={org}>
              {i > 0 && ', '}
              <b>{org}</b>
            </span>
          ))}
        </div>
      </div>
    ) : t('datagouv.checks.producer.noProducer')}
  </Check>
)

ProducerCheck.propTypes = {
  isValid: PropTypes.bool.isRequired,
  organizations: PropTypes.arrayOf(PropTypes.string),

  t: PropTypes.func.isRequired
}

export default translate('dataset')(ProducerCheck)
