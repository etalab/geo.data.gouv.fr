import React from 'react'

const CatalogHarvestResults = ({ logs }) => (
  <ul>
    {logs.map((log, idx) => (
      <li key={idx}>
        {log.split(':')[0]}: <strong>{log.split(':')[1]}</strong>
      </li>
    ))}
  </ul>
)

export default CatalogHarvestResults
