import React from 'react'
import Csw from '../../Csw/Csw'
import Statistics from '../../Statistics/Statistics'

const CatalogSection = ({catalog}) => {
  const styles = {
    table: {
      display: 'inline-block',
    },
  }

  return (
    <div style={styles.table}>
      <div>
        <h1 className="ui header">{catalog.name}</h1>
          <div className="ui divided items">
            {[catalog.serviceUrl].map( (url, idx) => <Csw key={idx} url={url}/>)}
          </div>
      </div>
      <Statistics value={catalog.lastHarvesting.recordsFound} size="small" label="Records" />
    </div>
      )
}

export default CatalogSection
