import React from 'react'

const CatalogHarvestLogs = ({ logs }) => (
  <div>
    {logs.map((log, idx) => (
      <pre key={idx}>
        <code>{log}</code>
      </pre>
    ))}
  </div>
)

export default CatalogHarvestLogs
