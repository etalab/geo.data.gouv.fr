import React from 'react'

const HarvestDelta = ({delta}) => {
  if (delta > 0) return <div><i className="long green arrow up icon"></i>+{delta}</div>
  if (delta < 0) return <div><i className="long red arrow down icon"></i>{delta}</div>
  return <div></div>

}

export default HarvestDelta
