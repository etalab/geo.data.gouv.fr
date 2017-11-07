import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

import { doneSince } from '../lib/date'

const HarvestStatus = ({ harvest, t }) => {
  // Retro-compatibility: the API sends one or the other:
  const finishedAt = harvest.finishedAt || harvest.finished
  const hoursDifference = doneSince(finishedAt)
  let status

  if (harvest.status === 'successful') {
    status = t('components.HarvestStatus.success')
  } else {
    status = t('components.HarvestStatus.fail')
  }

  return (
    <div>
      {status} {hoursDifference}
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
