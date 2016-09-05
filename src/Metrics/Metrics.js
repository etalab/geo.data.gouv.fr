import React from 'react'

const LastHarvesting = ({metrics}) => {

  return (
    <div className="ui right floated mini statistic">
      <div className="value">
        {metrics ? metrics.totalCount : 0}
      </div>
      <div className="label">Entries</div>
    </div>
  )
}

export default LastHarvesting
