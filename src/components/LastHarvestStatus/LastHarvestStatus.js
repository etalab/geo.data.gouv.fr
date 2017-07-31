import React from 'react'
import { translate } from 'react-i18next'

import { doneSince } from '../../helpers/doneSince'

const LastHarvestStatus = ({harvest, t}) => {
  // Retro-compatibilite, l'API renvoie l'un ou l'autre
  const finishedAt = harvest.finishedAt || harvest.finished
  const hoursDifference = doneSince(finishedAt)
  let status

  if (harvest.status === 'successful') {
    status = t('LastHarvestStatus.success')
  } else {
    status = t('LastHarvestStatus.fail')
  }

  return (
    <div>
      {status} {hoursDifference}
    </div>
  )
}

export default translate('Common')(LastHarvestStatus)
