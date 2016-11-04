import React from 'react'
import moment from 'moment'

const LastHarvesting = ({harvest, style, side='left'}) => {
  let color;
  if (harvest.status !== 'successful') {
    color = 'red'
  }

  const date = new Date(harvest.finishedAt).getTime()
  const hoursDifference = moment(date).fromNow();

  return (
    <div style={{...style, color}}>
      {harvest.status} {hoursDifference}
    </div>
  )
}

export default LastHarvesting
