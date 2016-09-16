import React from 'react'
import File from '../../File/File'

const CatalogSection = ({catalog}) => {
  return (
    <div>
      <div className="ui header">{catalog.name}</div>
        <div className="ui divided items">
        {[catalog.serviceUrl].map( (url, idx) => <File key={idx} url={url} description="Description du fichier téléchargeable." />)}
      </div>
    </div>
      )
}

export default CatalogSection
