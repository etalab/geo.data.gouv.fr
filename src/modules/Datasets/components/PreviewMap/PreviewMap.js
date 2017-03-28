import React, { Component } from 'react'

import CenteredMap from '../../../../components/CenteredMap'
import ContentLoader from '../../../../components/Loader/ContentLoader'

import styles from './PreviewMap.css'

const MAP = {
  lat: 47,
  lon: 1,
  zoom: 5.5,
}

const styleLoader = {
    width: '6em',
    height: '6em',
    top: '46%',
    left: '50%',
    borderWidth: '10px'
}

class PreviewMap extends Component {

  render() {
    const { geojson, distribution } = this.props
    const errors = [...this.props.errors]

    if (geojson && (!geojson.features || geojson.features.length === 0)) {
      errors.push('Les données sont vides')
    }

    const err = (
      <div className={styles.errors}>
        <strong>Une erreur est survenue lors du chargement de {distribution && (distribution.typeName || distribution.layer)}</strong>
        <br/>{errors}
      </div>
    )

    const loader = !geojson && !errors.length ? (
      <div className={styles.load}>
        <ContentLoader style={styleLoader} />
      </div>
    ) : null

    return (
      <div className={styles.container}>
        {errors.length ? err : null}
        {loader}
        {geojson ? <CenteredMap vectors={geojson} className={styles.map} zoom={MAP.zoom} lat={MAP.lat} lon={MAP.lon} /> : null}
      </div>
    )
  }
}

export default PreviewMap
