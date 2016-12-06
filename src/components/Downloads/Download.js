import React from 'react'
import { strRightBack } from 'underscore.string'
import { theme  } from '../../tools'
import './Download.css'

const styles = {
  active: {
    padding: '5px 10px',
    backgroundColor: theme.blue,
    color: '#fff',
    border: 'none',
  },
  inactive: {
    marginRight: '5px',
    padding: '5px 10px',
    backgroundColor: '#ddd',
    color: '#000',
    border: 'none',
  },
}

const Download = ({distribution, dlFormat, isPreview, preview, style}) => {
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
        <button style={isPreview ? styles.active : styles.inactive} onClick={() => preview && preview({distribution: distribution, link})}>Visualiser</button>
      </div>
    )
  } else {
    return <div style={style}>{name}</div>
  }
}

export default Download
