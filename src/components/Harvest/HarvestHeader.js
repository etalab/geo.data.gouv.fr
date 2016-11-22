import React from 'react'
import { Link } from 'react-router'
import LastHarvestStatus from '../LastHarvestStatus/LastHarvestStatus'

const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap-reverse',
  },
  h1: {
    padding: '0.1em',
  },
}

const HarvestHeader = ({ catalogId, catalogName, harvest, successful }) => {


  return (
    <div style={styles.header} >
      <div>
        <Link to={`/catalogs/${catalogId}`}>
          <h1 style={styles.h1} className="ui header">{catalogName}</h1>
        </Link>
        <h2>Identifiant du moissonnage: {harvest._id}</h2>
      </div>

      <span >
        <LastHarvestStatus harvest={harvest} />
      </span>
    </div>
  )
}

export default HarvestHeader
