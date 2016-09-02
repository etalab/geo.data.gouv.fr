import React from 'react'

const LastHarvesting = ({metrics}) => {
  return (
    <div className="ui right floated mini statistic">
      <div className="value">
        {metrics.totalCount}
      </div>
      <div className="label">Entrées</div>
    </div>
  )
}

export default LastHarvesting
