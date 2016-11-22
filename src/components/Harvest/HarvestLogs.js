import React from 'react'
import { theme } from '../../tools'

const styles = {
  log: {
    padding: '1em',
    backgroundColor: theme.white,
  }
}

const HarvestLogs = ({ logs }) => {
  return (
    <div style={styles.log}>
      {logs.map((log, idx) => <pre key={idx}><code>{log}</code></pre>)}
    </div>
  )
}

export default HarvestLogs
