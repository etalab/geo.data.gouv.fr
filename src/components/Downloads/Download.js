import React from 'react'
import { strRightBack } from 'underscore.string'
import { theme  } from '../../tools'

const styles = {
  container: {
    display: 'flex',
    alignItems: 'baseline',
    marginRight: '60%',
    justifyContent: 'space-between',
  },
  button: {
    padding: '5px 10px',
    backgroundColor: theme.blue,
    color: '#fff',
    border: 'none',
  },
  disabled: {
    padding: '5px 10px',
    backgroundColor: '#ddd',
    color: '#fff',
    border: 'none',
  }
}

const Download = ({distribution, dlFormat}) => {
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

  let dl = <div style={styles.disabled}>Télécharger</div>
  if (distribution.available) {
    dl = <a href={link + `?format=${format}&projection=${projection}`} style={styles.button}>Télécharger</a>
  }

  return (
    <div style={styles.container}>
      <a href={link}>{layerName || distribution.typeName}</a>
      {dl}
    </div>
  )
}

export default Download
