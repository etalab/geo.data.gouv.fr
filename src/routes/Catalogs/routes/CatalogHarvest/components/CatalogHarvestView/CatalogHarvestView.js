import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

import LastHarvestStatus from 'common/components/LastHarvestStatus'

import CatalogHarvestLogs from '../CatalogHarvestLogs'
import CatalogHarvestResults from '../CatalogHarvestResults'

import styles from './CatalogHarvestView.scss'

const CatalogHarvestView = ({ catalog, harvest, t }) => {
  const successful = harvest.status === 'successful'

  return (
    <div className={styles.container}>
      <Helmet title={`${t('CatalogHarvestView.documentTitle')} : ${harvest._id}`} />
      <h1>
        <Link to={`/catalogs/${catalog._id}`}>{catalog.name}</Link>
      </h1>

      <p>{t('CatalogHarvestView.harvestId')}: <code>{harvest._id}</code></p>
      <LastHarvestStatus harvest={harvest} />

      <div className={styles.results}>
        <h2>{successful ? t('CatalogHarvestView.results') : t('CatalogHarvestView.logs')}</h2>
        {successful ? (
          <CatalogHarvestResults logs={harvest.log} />
        ) : (
          <CatalogHarvestLogs logs={harvest.log} />
        )}
      </div>
    </div>
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
  }).isRequired,

  t: PropTypes.func.isRequired
}

export default translate('Catalogs.CatalogHarvest')(CatalogHarvestView)
