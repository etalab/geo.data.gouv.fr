import React from 'react'
import moment from 'moment'

const LastHarvesting = ({harvest, side='left'}) => {
  const color = harvest.status === "successful" ? "green" : "red"
  const date = new Date(harvest.finishedAt).getTime()
  const hoursDifference = moment(date).fromNow();

  return (
    <div className={`ui ${color} ${side} ribbon label`}>
      {harvest.status} <br /> {hoursDifference}
    </div>
  )
}

export default LastHarvesting
