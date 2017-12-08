import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { translate } from 'react-i18next'

const HarvestStatus = ({ harvest, t }) => {
  // Retro-compatibility: the API sends one or the other:
  const finishedAt = harvest.finishedAt || harvest.finished
  let status

  if (harvest.status === 'successful') {
    status = t('catalog.harvest.success')
  } else {
    status = t('catalog.harvest.fail')
  }

  return (
    <div>
      {status} {moment(finishedAt).fromNow()}
    </div>
  )
}

HarvestStatus.propTypes = {
  harvest: PropTypes.shape({
    status: PropTypes.string.isRequired,

    finishedAt: PropTypes.string,
    finished: PropTypes.string
  }).isRequired,
  t: PropTypes.func.isRequired
}

export default translate()(HarvestStatus)
