import React from 'react'
import moment from 'moment'

const Harvest = ({harvest}) => {
  const color = harvest.status === "successful" ? "green" : "red"
  const startDate = new Date(harvest.startAt).getTime()
  const endDate = new Date(harvest.finishedAt).getTime()
  const hoursDifference = moment(endDate).fromNow()
  const duration = moment(endDate).from(startDate)

  return (
      <tr>
        <td className="collapsing"><div className={`ui ${color} circular label`}>{harvest.status}</div></td>
        <td>{harvest.recordsFound}</td>
        <td className="right aligned collapsing">{hoursDifference || 'N/A' }</td>
        <td className="right aligned collapsing">{duration || 'N/A' }</td>
      </tr>
      )
}

export default Harvest
