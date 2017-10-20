import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import { Link } from 'react-router-dom'
import { get } from 'lodash'

import LastHarvestStatus from '../LastHarvestStatus/LastHarvestStatus'
import Counter from '../Statistics/Counter/Counter'
import Percent from '../Statistics/Percent/Percent'

import ObsoleteWarning from './ObsoleteWarning'

import styles from './CatalogPreview.scss'

export const CatalogPreview = ({ catalog, t }) => {
  let metrics = catalog.metrics
  let openness = get(metrics, 'datasets.partitions.openness.yes', 0)
  let download = get(metrics, 'datasets.partitions.download.yes', 0)

  return (
    <Link to={`/catalogs/${catalog._id}`} className={styles.link}>
      <div className={styles.title}>{catalog.name}</div>

      <LastHarvestStatus harvest={catalog.service.sync} />
      <ObsoleteWarning catalog={catalog} />

      <div className={styles.metrics}>
        {!metrics ? <div>{t('components.CatalogPreview.noData')}</div> : (
          <div>
            <Percent
              value={openness}
              total={metrics.datasets.totalCount}
              size='small'
              label={t('components.CatalogPreview.openDataLabel')} />

            <Percent
              value={download}
              total={metrics.datasets.totalCount}
              size='small'
              label={t('components.CatalogPreview.downloadableLabel')} />

            <Counter
              value={metrics.records.totalCount}
              size='small'
              label={t('components.CatalogPreview.recordsLabel')} />
          </div>
        )}
      </div>
    </Link>
  )
}

CatalogPreview.propTypes = {
  catalog: PropTypes.shape({
    metrics: PropTypes.shape({
      datasets: PropTypes.shape({
        totalCount: PropTypes.number.isRequired
      }).isRequired,

      records: PropTypes.shape({
        totalCount: PropTypes.number.isRequired
      }).isRequired
    }),

    service: PropTypes.shape({
      sync: PropTypes.object.isRequired
    }).isRequired
  }),

  t: PropTypes.func.isRequired
}

export default translate('Common')(CatalogPreview)
