import React from 'react'

const HarvestLogs = ({ logs }) => {
  return (
    <div>
      {logs.map((log, idx) => <pre key={idx}><code>{log}</code></pre>)}
    </div>
  )
}

export default HarvestLogs
