import React from 'react'
import { strRightBack } from 'underscore.string'
import { theme  } from '../../tools'
import { container, button } from './Download.css'

const styles = {
  active: {
    backgroundColor: theme.blue,
    color: '#fff',
  },
  inactive: {
    backgroundColor: '#ddd',
    color: '#000',
  },
}

const Download = ({distribution, dlFormat, isPreview, preview, display}) => {
  const { format, projection } = dlFormat
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

  if (distribution.available) {
    return (
      <div className={container}>
        <a href={link  + `?format=${format}&projection=${projection}`}>{name}</a>
        <div>
          <button className={button} style={(isPreview && display === 'map') ? styles.active : styles.inactive} onClick={() => preview && preview({distribution: distribution, link, display: 'map'})}>Carte</button>
          <button className={button} style={(isPreview && display === 'table') ? styles.active : styles.inactive} onClick={() => preview && preview({distribution: distribution, link, display: 'table'})}>Tableau</button>
        </div>
      </div>
    )
  } else {
    return <div className={container}>{name}</div>
  }
}

export default Download
