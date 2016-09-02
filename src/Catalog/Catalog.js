import React from 'react'
import { Link } from 'react-router'
import LastHarvesting from '../LastHarvesting/LastHarvesting'
import Metrics from '../Metrics/Metrics'
import Tags from '../Tags/Tags'

const Catalog = ({catalog}) => {
  return (
      <div className="ui segments">

        <div className="ui segment">
          <LastHarvesting harvest={catalog.lastHarvesting}/>
          <Link to={`/${catalog.name}`}><span className="ui large header">{catalog.name}</span></Link>
          <Metrics metrics={catalog.catalogMetrics} />
        </div>

        <div className="ui secondary segment">
          <Tags tags={catalog.tags} />
        </div>

      </div>
  )
}

export default Catalog
