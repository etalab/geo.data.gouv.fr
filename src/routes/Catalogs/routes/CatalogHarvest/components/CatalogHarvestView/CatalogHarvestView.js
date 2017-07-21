import React from 'react'
import PropTypes from 'prop-types'
import DocumentTitle from 'react-document-title'
import { Link } from 'react-router'

import LastHarvestStatus from 'common/components/LastHarvestStatus'

import CatalogHarvestLogs from '../CatalogHarvestLogs'
import CatalogHarvestResults from '../CatalogHarvestResults'

import styles from './CatalogHarvestView.scss'

const CatalogHarvestView = ({ catalog, harvest }) => {
  const successful = harvest.status === 'successful'

  return (
    <DocumentTitle title={`Moissonnage : ${harvest._id}`}>
      <div className={styles.container}>
        <h1>
          <Link to={`/catalogs/${catalog._id}`}>{catalog.name}</Link>
        </h1>

        <p>Identifiant du moissonnage: <code>{harvest._id}</code></p>
        <LastHarvestStatus harvest={harvest} />


        <div className={styles.results}>
          <h2>{successful ? 'Résultats' : 'Logs'}</h2>
          {successful ? (
            <CatalogHarvestResults logs={harvest.log} />
          ) : (
            <CatalogHarvestLogs logs={harvest.log} />
          )}
        </div>
      </div>
    </DocumentTitle>
  )
}

CatalogHarvestView.propTypes = {
  catalog: PropTypes.shape({
    _id: PropTypes.string.isRequired
  }).isRequired,

  harvest: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    log: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired
}

export default CatalogHarvestView
