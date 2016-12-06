import React from 'react'
import { strRightBack } from 'underscore.string'
import { theme  } from '../../tools'
import './Download.css'

const styles = {
  active: {
    marginRight: '5px',
    padding: '5px 10px',
    backgroundColor: theme.blue,
    color: '#fff',
    border: 'none',
  },
  disabled: {
    marginRight: '5px',
    padding: '5px 10px',
    backgroundColor: '#ddd',
    color: '#000',
    border: 'none',
  },
  buttons: {
    display: 'flex',
  }
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

  let downloadButton = <div style={styles.disabled}>Indisponible</div>
  let previewButton = null

  if (distribution.available) {
    downloadButton = <a href={link + `?format=${format}&projection=${projection}`} style={styles.active}>Télécharger</a>
    previewButton = <button style={isPreview ? styles.active : styles.disabled} onClick={() => preview && preview({distribution: distribution, link})}>Visualiser</button>
  }

  return (
    <div style={style} className="download">
      <a href={link}>{layerName || distribution.typeName}</a>
      <div style={styles.buttons}>
        {downloadButton}
        {previewButton}
      </div>
    </div>
  )
}

export default Download
