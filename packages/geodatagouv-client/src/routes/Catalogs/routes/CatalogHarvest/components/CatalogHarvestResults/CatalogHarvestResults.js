import React from 'react'
import PropTypes from 'prop-types'

const CatalogHarvestResults = ({ logs }) => (
  <ul>
    {logs.map((log, idx) => (
      <li key={idx}>
        {log.split(':')[0]}: <strong>{log.split(':')[1]}</strong>
      </li>
    ))}
  </ul>
)

CatalogHarvestResults.propTypes = {
  logs: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default CatalogHarvestResults
