import React from 'react'

const HarvestResults = ({ logs }) => {
  return (
    <ul>
      {
        logs.map((log, idx) =>
          <li key={idx}>
            {log.split(':')[0]}: <strong>{log.split(':')[1]}</strong>
          </li>
        )
      }
    </ul>
  )
}

export default HarvestResults
