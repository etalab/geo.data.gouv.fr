import PropTypes from 'prop-types'
import moment from 'moment'
import {translate} from 'react-i18next'

const Metadata = ({id, revisionDate, t}) => {
  const revisionDateLabel = revisionDate ? moment(revisionDate).fromNow() : t('common:enums.unknownData.unknown', {
    context: 'female'
  })

  return (
    <div>
      {t('metadata.id')} <b>{id}</b>
      <br />
      {t('metadata.revisionDate')} <b>{revisionDateLabel}</b>

      <style jsx>{`
        div {
          margin-top: 1em;
        }
      `}</style>
    </div>
  )
}

Metadata.propTypes = {
  id: PropTypes.string.isRequired,
  revisionDate: PropTypes.string,

  t: PropTypes.func.isRequired
}

Metadata.defaultProps = {
  revisionDate: null
}

export default translate('dataset')(Metadata)
