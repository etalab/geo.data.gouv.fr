import React from 'react'
import moment from 'moment'

const LastHarvesting = ({harvest, style, side='left'}) => {
  const color = harvest.status === 'successful' ? 'green' : 'red'
  const date = new Date(harvest.finishedAt).getTime()
  const hoursDifference = moment(date).fromNow();

  return (
    <div style={style} className={`ui ${color} ${side} ribbon label`}>
      {harvest.status} <br /> {hoursDifference}
    </div>
  )
}

export default LastHarvesting
