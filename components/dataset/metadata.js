import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { translate } from 'react-i18next'

const Metadata = ({ id, revisionDate, t }) => {
  const revisionDateLabel = moment(revisionDate).fromNow()

  return (
    <div>
      {t('metadata.id')} <b>{id}</b>
      <br />
      {t('metadata.revisionDate')} <b>{revisionDateLabel}</b>

      <style jsx>{`
        div {
          margin-top: 1.8em;
        }
      `}</style>
    </div>
  )
}

Metadata.propTypes = {
  id: PropTypes.string.isRequired,
  revisionDate: PropTypes.string.isRequired,

  t: PropTypes.func.isRequired
}

export default translate('dataset')(Metadata)
