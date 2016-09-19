import React from 'react'
import moment from 'moment'

const Harvest = ({harvest}) => {
  const color = harvest.status === "successful" ? "green" : "red"
  const startDate = new Date(harvest.finished).getTime() // finished must be replace by startAt, still does not exist
  const endDate = new Date(harvest.finished).getTime()
  const hoursDifference = moment(endDate).fromNow()
  const duration = moment(endDate).from(startDate)

  return (
    <div className="ui equal width grid">
      <div className="column">
        <div className={`ui ${color} circular label`}>{harvest.status}</div>
      </div>
      <div className="column">
        <p>{harvest.itemsFound} Records</p>
      </div>
      <div className="column">
        <p>{hoursDifference || 'N/A' }</p>
      </div>
      <div className="column">
        <p>{duration || 'N/A' }</p>
      </div>
    </div>
      )
}

export default Harvest
