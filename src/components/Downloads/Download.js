import React from 'react'
import { strRightBack } from 'underscore.string'
import { theme  } from '../../tools'
import './Download.css'

const styles = {
  active: {
    marginLeft: '2px',
    padding: '5px 10px',
    backgroundColor: theme.blue,
    color: '#fff',
    border: 'none',
  },
  inactive: {
    marginLeft: '2px',
    padding: '5px 10px',
    backgroundColor: '#ddd',
    color: '#000',
    border: 'none',
  },
}

const Download = ({distribution, dlFormat, isPreview, preview, display, style}) => {
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
      <div style={style}>
        <a href={link  + `?format=${format}&projection=${projection}`}>{name}</a>
        <div style={styles.buttons}>
          <button style={(isPreview && display === 'map') ? styles.active : styles.inactive} onClick={() => preview && preview({distribution: distribution, link, display: 'map'})}>Carte</button>
          <button style={(isPreview && display === 'table') ? styles.active : styles.inactive} onClick={() => preview && preview({distribution: distribution, link, display: 'table'})}>Tableau</button>
        </div>
      </div>
    )
  } else {
    return <div style={style}>{name}</div>
  }
}

export default Download
