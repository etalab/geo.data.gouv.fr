import React from 'react'
import moment from 'moment'

const LastHarvestStatus = ({harvest}) => {
  // Retro-compatibilite, l'API renvoie l'un ou l'autre
  const finishedAt = harvest.finishedAt || harvest.finished
  const date = new Date(finishedAt).getTime()
  const hoursDifference = moment(date).fromNow()
  let status

  if (harvest.status === 'successful') {
    status = 'Réussi'
  } else {
    status = 'En échec'
  }

  return (
    <div>
      {status} {hoursDifference}
    </div>
  )
}

export default LastHarvestStatus
