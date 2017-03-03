import React from 'react'
import { strRightBack } from 'underscore.string'
import { container, title, selectTitle } from './Download.css'

const FORMATS = [
  {label: 'GeoJSON', format: 'GeoJSON', projection: 'WGS84'},
  {label: 'SHP/L93', format: 'SHP', projection: 'Lambert93'},
  {label: 'SHP/W84', format: 'SHP', projection: 'WGS84'},
  {label: 'KML', format: 'KML', projection: 'WGS84'},
  {label: 'CSV', format: 'CSV', projection: 'WGS84'},
]

const Download = ({ distribution }) => {
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
    <div className={container}>
      <img src={distribution.preview  || '/assets/no-img.png'} alt="preview" />
      <div className={title}>{name}</div>
      {distribution.available ?
        <select onChange={(evt) => window.location.href = evt.target.value}>>
          <option className={selectTitle}>Télécharger</option>
          {FORMATS.map((format, idx) =>
            <option key={idx} value={link  + `?format=${format.format}&projection=${format.projection}`}>
              {format.label}
            </option>
          )}
        </select> :
        <select disabled>
          <option >Télécharger</option>
        </select>
      }

    </div>
  )
}

export default Download
