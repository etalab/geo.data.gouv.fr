import React from 'react'
import { Link } from 'react-router'
import LastHarvestStatus from '../LastHarvestStatus/LastHarvestStatus'
import Counter from '../Statistics/Counter/Counter'
import Percent from '../Statistics/Percent/Percent'
import ObsoleteWarning from './ObsoleteWarning'
import { get } from 'lodash'
import { theme } from '../../tools'

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '1em',
    fontSize: '11px',
  },
  link: {
    cursor: 'pointer',
    margin: '1em 3em',
    display: 'inline-block',
    width: '300px',
    position: 'relative',
  },
  title: {
    fontSize: '1.4em',
  },
  paper: {
    backgroundColor: 'white',
    padding: '2em 20px',
    boxShadow: theme.boxShadowZ1,
  },
  lastHarvesting: {
    fontSize: '0.8em',
  },
  catalogPreview: {
    marginTop: '1em',
  },
}

const CatalogPreview = ({ catalog }) => {
  let openness = get(catalog.metrics, 'datasets.partitions.openness.yes', 0)
  let download = get(catalog.metrics, 'datasets.partitions.download.yes', 0)

  return (
    <Link to={`/catalogs/${catalog._id}`} style={styles.link}>
      <div style={styles.paper}>
        <div style={styles.title}>{catalog.name}</div>
        <LastHarvestStatus harvest={catalog.service.sync} />
        <ObsoleteWarning catalog={catalog} />
        <div style={styles.container}>
          <Percent value={openness} total={catalog.metrics.datasets.totalCount} label="Données ouvertes" icon="unlock alternate icon" />
          <Percent value={download} total={catalog.metrics.datasets.totalCount} label="Téléchargeable" icon="download" />
          <Counter value={catalog.metrics.records.totalCount} label="Enregistrements" />
        </div>
      </div>
    </Link>

  )
}

export default CatalogPreview
