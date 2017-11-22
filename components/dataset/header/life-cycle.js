import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { translate } from 'react-i18next'

const LifeCycle = ({ updateFrequency, creationDate, t }) => {
  const frequency = t([`common:enums.frequencies.${updateFrequency}`, 'common:enums.unknownData.unknown'], {
    context: 'female'
  })

  const creation = creationDate ? moment(creationDate).format('LL') : t('common:enums.unknownData.unknown', {
    context: 'female'
  })

  return (
    <div>
      <h5>{t('lifeCycle')}</h5>
      <div>
        {t('labels.creationDate')} <b>{creation}</b>
      </div>
      <div>
        {t('labels.updateFrequency')} <b>{frequency}</b>
      </div>

      <style jsx>{`
        @import 'colors';

        h5 {
          margin-bottom: 1rem;
        }

        b {
          color: $blue;
        }
      `}</style>
    </div>
  )
}

LifeCycle.propTypes = {
  updateFrequency: PropTypes.string,
  creationDate: PropTypes.string,

  t: PropTypes.func.isRequired
}

export default translate('dataset')(LifeCycle)
