import React from 'react'
import Csw from '../../Csw/Csw'

const CatalogSection = ({catalog}) => {
  return (
    <div>
      <h1 className="ui header">{catalog.name}</h1>
        <div className="ui divided items">
        {[catalog.serviceUrl].map( (url, idx) => <Csw key={idx} url={url}/>)}
      </div>
    </div>
      )
}

export default CatalogSection
