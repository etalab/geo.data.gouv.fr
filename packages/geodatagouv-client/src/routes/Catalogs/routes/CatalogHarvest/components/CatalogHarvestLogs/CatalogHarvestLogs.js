import React from 'react'
import PropTypes from 'prop-types'

const CatalogHarvestLogs = ({ logs }) => (
  <div>
    {logs.map((log, idx) => (
      <pre key={idx}>
        <code>{log}</code>
      </pre>
    ))}
  </div>
)

CatalogHarvestLogs.propTypes = {
  logs: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default CatalogHarvestLogs
