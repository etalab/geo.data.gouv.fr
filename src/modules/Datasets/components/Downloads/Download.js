import React from 'react'
import strRightBack from 'underscore.string/strRightBack'
import { download, container, title, viewerButton, formats } from './Download.css'

const FORMATS = [
  {label: 'GeoJSON', format: 'GeoJSON', projection: 'WGS84'},
  {label: 'SHP/L93', format: 'SHP', projection: 'Lambert93'},
  {label: 'SHP/W84', format: 'SHP', projection: 'WGS84'},
  {label: 'KML', format: 'KML', projection: 'WGS84'},
  {label: 'CSV', format: 'CSV', projection: 'WGS84'},
]

const Download = ({ distribution, isPreview, preview }) => {
  let link = 'https://inspire.data.gouv.fr/api/geogw/'
  let layerName

  if (distribution.type === 'file-package') {
    layerName = strRightBack(distribution.layer, '/')
    link += `file-packages/${distribution.hashedLocation}/${layerName}/download`
  }

  if (distribution.type === 'wfs-featureType') {
    link += `services/${distribution.service}/feature-types/${distribution.typeName}/download`
  }

  const name = layerName || distribution.typeName

  return (
    <div className={download}>
      <div className={title}>{name}</div>
      <div>
        <div className={container}>
          <div>
            <div>Télécharger<i className="download icon"></i></div>
            <div className={formats}>
              { !distribution.available ? <p>Indisponible</p> :
                FORMATS.map( (format, idx) => <a key={idx} href={link  + `?format=${format.format}&projection=${format.projection}`}>{format.label}</a>)
              }
            </div>
          </div>
          { !distribution.available ?
            <button className={viewerButton} disabled>Visualiser</button> :
            <button className={viewerButton} onClick={() => preview({distribution, link})}>
              Visualiser { isPreview ? <i className="unhide icon"></i> : null }
            </button>
          }
        </div>
      </div>
    </div>
  )
}

export default Download
