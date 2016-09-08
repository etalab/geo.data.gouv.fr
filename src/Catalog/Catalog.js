import React from 'react'
import { Link } from 'react-router'
import LastHarvesting from '../LastHarvesting/LastHarvesting'
import Metrics from '../Metrics/Metrics'

const Catalog = ({catalog}) => {
  return (
      <div className="ui segments">

        <div className="ui segment">
          <LastHarvesting harvest={catalog.lastHarvesting}/>
          <Link to={`catalog/${catalog.id}`}><span className="ui large header">{catalog.name}</span></Link>
          <Metrics metrics={catalog.catalogMetrics} />
        </div>

      </div>
  )
}

export default Catalog
