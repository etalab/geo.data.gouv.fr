import React from 'react'

const HarvestDetail = ({logs}) => {
  return (
    <div className="harvest-detail">
      <div className="ui padded vertical segment">
        <div className="ui header">Logs</div>
        <div className="ui divider"></div>
        {logs.map((log, idx) => <p key={idx}>{log}</p>)}
      </div>
    </div>
  )
}

export default HarvestDetail
