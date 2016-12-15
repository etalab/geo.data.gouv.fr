import React from 'react'
import Counter from '../../Statistics/Counter/Counter'
import Percent from '../../Statistics/Percent/Percent'
import { get } from 'lodash'
import { container } from './CatalogPreview.css'

const CatalogPreview = ({metrics}) => {
  let openness = get(metrics, 'datasets.partitions.openness.yes', 0)
  let download = get(metrics, 'datasets.partitions.download.yes', 0)

  return (
    <div className={container}>
      <Percent value={openness} total={metrics.datasets.totalCount} label="Données ouvertes" icon="unlock alternate icon" />
      <Percent value={download} total={metrics.datasets.totalCount} label="Téléchargeable" icon="download" />
      <Counter value={metrics.records.totalCount} label="Enregistrements" />
    </div>
  )
}

export default CatalogPreview
