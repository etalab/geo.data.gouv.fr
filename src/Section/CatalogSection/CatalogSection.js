import React from 'react'
import Csw from '../../Csw/Csw'
import Statistics from '../../Statistics/Statistics'
import LastHarvesting from '../../LastHarvesting/LastHarvesting'

const CatalogSection = ({catalog}) => {
  return (
    <div className="ui equal width stackable grid">
      <div className="column">
        <h1 className="ui header">{catalog.name}</h1>
          <div className="ui divided items">
            {[catalog.serviceUrl].map( (url, idx) => <Csw key={idx} url={url}/>)}
          </div>
      </div>
      <div className="column">
        <Statistics value={catalog.lastHarvesting.recordsFound} size="small" label="Records" />
      </div>
      <div className="column">
        <LastHarvesting harvest={catalog.lastHarvesting} side='right'/>
      </div>
    </div>
      )
}

export default CatalogSection
