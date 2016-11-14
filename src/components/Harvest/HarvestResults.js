import React from 'react'

const styles = {
  li: {
    margin: '1em',
  },
  results: {
    marginLeft: '0.5em',
    fontSize: '1.5em',
  },
}

const HarvestResults = ({ logs }) => {
  return (
    <ul>
      {logs.map((log, idx) =>
      <li key={idx} style={styles.li}>
        {log.split(':')[0]}: <span style={styles.results}>{log.split(':')[1]}</span>
      </li>)}
    </ul>
  )
}

export default HarvestResults
