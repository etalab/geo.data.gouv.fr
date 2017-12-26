import PropTypes from 'prop-types'
import moment from 'moment'
import {translate} from 'react-i18next'

const LifeCycle = ({updateFrequency, creationDate, status, t}) => {
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
      {status && <div>
        {t('labels.status')} <b>{t(`enums.status.${status}`)}</b>
      </div>}

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
  status: PropTypes.string,

  t: PropTypes.func.isRequired
}

LifeCycle.defaultProps = {
  updateFrequency: 'unknown',
  creationDate: null,
  status: null
}

export default translate('dataset')(LifeCycle)
