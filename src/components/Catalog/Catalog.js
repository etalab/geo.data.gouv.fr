import React from 'react'
import { Link } from 'react-router'
import CatalogPreview from './CatalogPreview/CatalogPreview'
import LastHarvestStatus from '../LastHarvestStatus/LastHarvestStatus'
import { theme } from '../../tools'

const styles = {
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

const Catalog = ({ catalog }) => {
  return (
      <Link to={`/catalogs/${catalog._id}`} style={styles.link}>
        <div style={styles.paper}>
          <div style={styles.title}>{catalog.name}</div>
          <LastHarvestStatus harvest={catalog.service.sync}/>
          <CatalogPreview metrics={catalog.metrics} />
        </div>
      </Link>
  )
}

export default Catalog
