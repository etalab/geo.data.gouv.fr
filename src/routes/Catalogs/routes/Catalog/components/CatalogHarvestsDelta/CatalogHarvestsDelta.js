import React from 'react'
import PropTypes from 'prop-types'

const CatalogHarvestDelta = ({ delta }) => {
  if (delta > 0) {
    return (
      <div>
        <i className="long green arrow up icon"></i> +{delta}
      </div>
    )
  }

  if (delta < 0) {
    return (
      <div>
        <i className="long red arrow down icon"></i> {delta}
      </div>
    )
  }

  return <div>0</div>
}

CatalogHarvestDelta.PropTypes = {
  delta: PropTypes.number
}

export default CatalogHarvestDelta
