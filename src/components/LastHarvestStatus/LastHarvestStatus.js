import React from 'react'
import moment from 'moment'
import { theme } from '../../tools'

let styles = {
  chip: {},
}

const LastHarvestStatus = ({harvest}) => {
  const date = new Date(harvest.finishedAt).getTime()
  const hoursDifference = moment(date).fromNow()
  let status

  if (harvest.status === 'successful') {
    styles.chip.color =  theme.highlightblue
    status = 'Réussi'
  } else {
    styles.chip.color =  theme.red
    status = 'En échec'
  }

  return (
    <div style={styles.chip}>
      {status} {hoursDifference}
    </div>
  )
}

export default LastHarvestStatus
