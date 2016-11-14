import React from 'react'
import HarvestLogs from './HarvestLogs'
import HarvestResults from './HarvestResults'

const styles = {
  content: {
    padding: '2em',
  },
}

const HarvestContent = ({ successful, logs}) => {
  return (
      <div style={styles.content}>
        <div className="ui header">{successful ? 'Results' : 'Logs'}</div>
        <div className="ui divider"></div>
        {successful ? <HarvestResults logs={logs}/> : <HarvestLogs logs={logs}/>}
      </div>
  )
}

export default HarvestContent
